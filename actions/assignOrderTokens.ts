"use server";

import { Piece } from "@/types/Piece";
import { BigQuery } from "@google-cloud/bigquery";
import { revalidatePath } from "next/cache";

export default async function assignOrderTokens(areasContainingYourUnits: string[], orderTokens: Piece[]) {
    for (const area of areasContainingYourUnits) {
        const numberOfOrderTokensInArea = orderTokens.filter(orderToken => orderToken.area === area).length;
        if (numberOfOrderTokensInArea === 0) {
            return {error: `You failed to assign an Order token in ${area}.`};
        } else if (numberOfOrderTokensInArea > 1) {
            return {error: `You assigned too many Order tokens in ${area}.`};
        }
    }

    const bigQuery = new BigQuery();

    await bigQuery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.pieces\` (house, type, name, area) VALUES
        ${orderTokens.map(orderToken => `('${orderToken.house}', 'order', '${orderToken.name}', '${orderToken.area}')`).join(",")}`);

    await bigQuery.query(`
        UPDATE \`a-game-of-a-game-of-thrones.dataset.players\`
        SET isDone = true
        WHERE house = '${orderTokens[0].house}'
    `);

    revalidatePath('/');

    return {error: null};
}