"use server";

import { auth0 } from "@/lib/auth0";
import { Player } from "@/types/Player";
import { BigQuery } from "@google-cloud/bigquery";
import { revalidatePath } from "next/cache";

export default async function joinGame() {
    const email = (await auth0.getSession())?.user.email;

    const bigQuery = new BigQuery();

    const [availablePlayerRows] = await bigQuery.query("SELECT * FROM `a-game-of-a-game-of-thrones.dataset.players` WHERE email IS NULL LIMIT 1000");

    const availablePlayers = availablePlayerRows as Player[];

    const randomHouse = availablePlayers[Math.floor(Math.random() * availablePlayers.length)].house;

    await bigQuery.query(`
        UPDATE \`a-game-of-a-game-of-thrones.dataset.players\`
        SET email = '${email}'
        WHERE house = '${randomHouse}'
    `);
    
    revalidatePath('/');
}