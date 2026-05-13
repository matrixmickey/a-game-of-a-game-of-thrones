"use server";

import { auth0 } from "@/lib/auth0";
import { BigQuery } from "@google-cloud/bigquery";
import { revalidatePath } from "next/cache";

export default async function joinGame() {
    const email = (await auth0.getSession())?.user.email;

    await new BigQuery().query(`
        DECLARE isFirstPlayer BOOL;
        SET isFirstPlayer = (SELECT row_count = 0 AS result FROM \`a-game-of-a-game-of-thrones.dataset.__TABLES__\` WHERE table_id = 'players');

        INSERT INTO \`a-game-of-a-game-of-thrones.dataset.players\` (email, house)
        WITH PossibleValues AS (
        SELECT ['Stark', 'Greyjoy', 'Lannister', 'Martell', 'Tyrell', 'Baratheon'] AS options
        ),
        AvailableValues AS (
        SELECT val
        FROM PossibleValues,
        UNNEST(options) AS val
        WHERE val NOT IN (SELECT DISTINCT house FROM \`a-game-of-a-game-of-thrones.dataset.players\`)
        )
        SELECT '${email}' AS email, val AS house
        FROM AvailableValues
        WHERE NOT EXISTS (
        SELECT 1 FROM \`a-game-of-a-game-of-thrones.dataset.players\` WHERE email = '${email}'
        )
        ORDER BY RAND() -- Randomize order
        LIMIT 1;

        IF isFirstPlayer THEN
        TRUNCATE TABLE \`a-game-of-a-game-of-thrones.dataset.house-pieces\`;

        INSERT INTO \`a-game-of-a-game-of-thrones.dataset.house-pieces\` (house, type, area) VALUES
            ('Stark', 'footman', 'White Harbor'),
            ('Stark', 'footman', 'Winterfell'),
            ('Stark', 'knight', 'Winterfell'),
            ('Stark', 'ship', 'The Shivering Sea'),
            ('Greyjoy', 'footman', 'Greywater Watch'),
            ('Greyjoy', 'footman', 'Pyke'),
            ('Greyjoy', 'knight', 'Pyke'),
            ('Greyjoy', 'ship', 'Port of Pyke'),
            ('Greyjoy', 'ship', 'Ironmans Bay'),
            ('Lannister', 'footman', 'Stoney Sept'),
            ('Lannister', 'footman', 'Lannisport'),
            ('Lannister', 'knight', 'Lannisport'),
            ('Lannister', 'ship', 'The Golden Sound'),
            ('Martell', 'footman', 'Salt Shore'),
            ('Martell', 'footman', 'Sunspear'),
            ('Martell', 'knight', 'Sunspear'),
            ('Martell', 'ship', 'Sea Of Dorne'),
            ('Tyrell', 'footman', 'Dornish Marches'),
            ('Tyrell', 'footman', 'Highgarden'),
            ('Tyrell', 'knight', 'Highgarden'),
            ('Tyrell', 'ship', 'Redwyne Straights'),
            ('Baratheon', 'footman', 'Kingswood'),
            ('Baratheon', 'footman', 'Dragonstone'),
            ('Baratheon', 'knight', 'Dragonstone'),
            ('Baratheon', 'ship', 'Shipbreaker Bay'),
            ('Baratheon', 'ship', 'Shipbreaker Bay');
        
        END IF;
    `);
    
    revalidatePath('/');
}