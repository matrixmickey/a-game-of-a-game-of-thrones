"use server";

import { Piece } from "@/types/Piece";
import { Player } from "@/types/Player";
import { BigQuery } from "@google-cloud/bigquery";
import { revalidatePath } from "next/cache";

export default async function assignOrderTokens(you: Player, areasContainingYourUnits: string[], orderTokens: Piece[]) {
    const numberOfSpecialOrderTokensAllowed = you.kingsCourtTrack < 2 ? 3 : you.kingsCourtTrack < 3 ? 2 : you.kingsCourtTrack < 4 ? 1 : 0;

    let numberOfSpecialOrderTokens = 0;

    for (const area of areasContainingYourUnits) {
        const orderTokensInArea = orderTokens.filter(orderToken => orderToken.area === area);

        const numberOfOrderTokensInArea = orderTokensInArea.length;
        if (numberOfOrderTokensInArea === 0 && orderTokens.length < 10 + numberOfSpecialOrderTokensAllowed) {
            return {error: `You failed to assign an Order token in ${area}.`};
        } else if (numberOfOrderTokensInArea > 1) {
            return {error: `You assigned too many Order tokens in ${area}.`};
        }

        if (numberOfOrderTokensInArea > 0 && orderTokensInArea[0].name.endsWith("-special")) {
            numberOfSpecialOrderTokens++;
        }
    }

    if (numberOfSpecialOrderTokens > numberOfSpecialOrderTokensAllowed) {
        return {error: "You assigned too many Special Order tokens according to the number of stars printed next to your position on the King's Court Influence track."};
    }

    const bigQuery = new BigQuery();

    await bigQuery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.pieces\` (house, type, name, area) VALUES
        ${orderTokens.map(orderToken => `('${orderToken.house}', 'order', '${orderToken.name}', '${orderToken.area}')`).join(",")}`);

    await bigQuery.query(`
        UPDATE \`a-game-of-a-game-of-thrones.dataset.players\`
        SET isDone = true
        WHERE house = '${you.house}'
    `);

    const [notDonePlayerRows] = await bigQuery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.players` WHERE isDone = false');

    if (notDonePlayerRows.length === 0) {
        await bigQuery.query(`
            UPDATE \`a-game-of-a-game-of-thrones.dataset.games\`
            SET phase = 'Planning - Use Messenger Raven'
            WHERE TRUE
        `);
    }

    revalidatePath('/');

    return {error: null};
}