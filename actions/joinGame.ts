"use server";

import { auth0 } from "@/lib/auth0";
import { Player } from "@/types/Player";
import { BigQuery } from "@google-cloud/bigquery";
import { revalidatePath } from "next/cache";

export default async function joinGame() {
    const email = (await auth0.getSession())?.user.email;

    const bigQuery = new BigQuery();

    const [playerRows] = await bigQuery.query("SELECT * FROM `a-game-of-a-game-of-thrones.dataset.players` LIMIT 1000");

    const players = playerRows as Player[];

    const takenHouses = players.map(player => player.house);

    const availableHouses = ['Stark', 'Greyjoy', 'Lannister', 'Martell', 'Tyrell', 'Baratheon'].filter(house => !takenHouses.includes(house));

    const randomHouse = availableHouses[Math.floor(Math.random() * availableHouses.length)];

    let ironThroneTrack;
    let fiefdomsTrack;
    let kingsCourtTrack;
    let supplyTrack;

    switch (randomHouse) {
        case 'Stark':
            ironThroneTrack = 3;
            fiefdomsTrack = 4;
            kingsCourtTrack = 2;
            supplyTrack = 1;
            break;
        case 'Greyjoy':
            ironThroneTrack = 5;
            fiefdomsTrack = 1;
            kingsCourtTrack = 6;
            supplyTrack = 2;
            break;
        case 'Lannister':
            ironThroneTrack = 2;
            fiefdomsTrack = 6;
            kingsCourtTrack = 1;
            supplyTrack = 2;
            break;
        case 'Martell':
            ironThroneTrack = 4;
            fiefdomsTrack = 3;
            kingsCourtTrack = 3;
            supplyTrack = 2;
            break;
        case 'Tyrell':
            ironThroneTrack = 6;
            fiefdomsTrack = 2;
            kingsCourtTrack = 5;
            supplyTrack = 2;
            break;
        case 'Baratheon':
            ironThroneTrack = 1;
            fiefdomsTrack = 5;
            kingsCourtTrack = 4;
            supplyTrack = 2;
            break;
    }

    await bigQuery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.players\` (email, house, ironThroneTrack, fiefdomsTrack, kingsCourtTrack, supplyTrack, isDone) VALUES
        ('${email}', '${randomHouse}', ${ironThroneTrack}, ${fiefdomsTrack}, ${kingsCourtTrack}, ${supplyTrack}, false)`);

    if (players.length === 0) {
        await bigQuery.query("INSERT INTO `a-game-of-a-game-of-thrones.dataset.games` (wildlingThreat, round, phase) VALUES (2, 1, 'Planning')");

        await bigQuery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.house-pieces\` (house, type, area) VALUES
            ('neutral', '6', 'The Eyrie'),
            ('neutral', '5', 'Kings Landing'),
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
            ('Baratheon', 'ship', 'Shipbreaker Bay')
        `);
    }
    
    revalidatePath('/');
}