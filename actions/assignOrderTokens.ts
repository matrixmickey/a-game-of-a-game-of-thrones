"use server";

import { Piece } from "@/types/Piece";
import { Player } from "@/types/Player";
import { BigQuery } from "@google-cloud/bigquery";
import { revalidatePath } from "next/cache";

export default async function assignOrderTokens(you: Player, areasContainingYourUnits: string[], orderTokens: Piece[]) {
    let numberOfSpecialOrderTokens = 0;

    for (const area of areasContainingYourUnits) {
        const orderTokensInArea = orderTokens.filter(orderToken => orderToken.area === area);

        const numberOfOrderTokensInArea = orderTokensInArea.length;
        if (numberOfOrderTokensInArea === 0) {
            return {error: `You failed to assign an Order token in ${area}.`};
        } else if (numberOfOrderTokensInArea > 1) {
            return {error: `You assigned too many Order tokens in ${area}.`};
        }

        if (orderTokensInArea[0].name.endsWith("-special")) {
            numberOfSpecialOrderTokens++;
        }
    }

    if (numberOfSpecialOrderTokens > 3 || (you.kingsCourtTrack > 2 && numberOfSpecialOrderTokens > 2) || (you.kingsCourtTrack  > 3 && numberOfSpecialOrderTokens > 1) || (you.kingsCourtTrack > 4 && numberOfSpecialOrderTokens > 0)) {
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

    revalidatePath('/');

    return {error: null};
}