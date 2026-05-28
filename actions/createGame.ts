import { BigQuery } from "@google-cloud/bigquery";

export default async function createGame() {
    const bigQuery = new BigQuery();

    await bigQuery.query("TRUNCATE TABLE `a-game-of-a-game-of-thrones.dataset.players`");

    await bigQuery.query("TRUNCATE TABLE `a-game-of-a-game-of-thrones.dataset.pieces`");

    await bigQuery.query("INSERT INTO `a-game-of-a-game-of-thrones.dataset.games` (wildlingThreat, round, phase) VALUES (2, 1, 'Planning - Assign Orders')");

    await bigQuery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.players\` (house, ironThroneTrack, fiefdomsTrack, kingsCourtTrack, supplyTrack, isDone) VALUES
        ('Stark', 3, 4, 2, 1, false),
        ('Greyjoy', 5, 1, 6, 2, false),
        ('Lannister', 2, 6, 1, 2, false),
        ('Martell', 4, 3, 3, 2, false),
        ('Tyrell', 6, 2, 5, 2, false),
        ('Baratheon', 1, 5, 4, 2, false)
    `);

    await bigQuery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.pieces\` (house, type, name, area) VALUES
        ('neutral', 'garrison', '6', 'The Eyrie'),
        ('neutral', 'garrison', '5', 'Kings Landing'),
        ('Stark', 'garrison', '2', 'Winterfell'),
        ('Stark', 'unit', 'footman', 'White Harbor'),
        ('Stark', 'unit', 'footman', 'Winterfell'),
        ('Stark', 'unit', 'knight', 'Winterfell'),
        ('Stark', 'unit', 'ship', 'The Shivering Sea'),
        ('Stark', 'power', '1', 'player'),
        ('Stark', 'power', '1', 'player'),
        ('Stark', 'power', '1', 'player'),
        ('Stark', 'power', '1', 'player'),
        ('Stark', 'power', '1', 'player'),
        ('Greyjoy', 'garrison', '2', 'Pyke'),
        ('Greyjoy', 'unit', 'footman', 'Greywater Watch'),
        ('Greyjoy', 'unit', 'footman', 'Pyke'),
        ('Greyjoy', 'unit', 'knight', 'Pyke'),
        ('Greyjoy', 'unit', 'ship', 'Port of Pyke'),
        ('Greyjoy', 'unit', 'ship', 'Ironmans Bay'),
        ('Greyjoy', 'power', '1', 'player'),
        ('Greyjoy', 'power', '1', 'player'),
        ('Greyjoy', 'power', '1', 'player'),
        ('Greyjoy', 'power', '1', 'player'),
        ('Greyjoy', 'power', '1', 'player'),
        ('Lannister', 'garrison', '2', 'Lannisport'),
        ('Lannister', 'unit', 'footman', 'Stoney Sept'),
        ('Lannister', 'unit', 'footman', 'Lannisport'),
        ('Lannister', 'unit', 'knight', 'Lannisport'),
        ('Lannister', 'unit', 'ship', 'The Golden Sound'),
        ('Lannister', 'power', '1', 'player'),
        ('Lannister', 'power', '1', 'player'),
        ('Lannister', 'power', '1', 'player'),
        ('Lannister', 'power', '1', 'player'),
        ('Lannister', 'power', '1', 'player'),
        ('Martell', 'garrison', '2', 'Sunspear'),
        ('Martell', 'unit', 'footman', 'Salt Shore'),
        ('Martell', 'unit', 'footman', 'Sunspear'),
        ('Martell', 'unit', 'knight', 'Sunspear'),
        ('Martell', 'unit', 'ship', 'Sea Of Dorne'),
        ('Martell', 'power', '1', 'player'),
        ('Martell', 'power', '1', 'player'),
        ('Martell', 'power', '1', 'player'),
        ('Martell', 'power', '1', 'player'),
        ('Martell', 'power', '1', 'player'),
        ('Tyrell', 'garrison', '2', 'Highgarden'),
        ('Tyrell', 'unit', 'footman', 'Dornish Marches'),
        ('Tyrell', 'unit', 'footman', 'Highgarden'),
        ('Tyrell', 'unit', 'knight', 'Highgarden'),
        ('Tyrell', 'unit', 'ship', 'Redwyne Straights'),
        ('Tyrell', 'power', '1', 'player'),
        ('Tyrell', 'power', '1', 'player'),
        ('Tyrell', 'power', '1', 'player'),
        ('Tyrell', 'power', '1', 'player'),
        ('Tyrell', 'power', '1', 'player'),
        ('Baratheon', 'garrison', '2', 'Dragonstone'),
        ('Baratheon', 'unit', 'footman', 'Kingswood'),
        ('Baratheon', 'unit', 'footman', 'Dragonstone'),
        ('Baratheon', 'unit', 'knight', 'Dragonstone'),
        ('Baratheon', 'unit', 'ship', 'Shipbreaker Bay'),
        ('Baratheon', 'unit', 'ship', 'Shipbreaker Bay'),
        ('Baratheon', 'power', '1', 'player'),
        ('Baratheon', 'power', '1', 'player'),
        ('Baratheon', 'power', '1', 'player'),
        ('Baratheon', 'power', '1', 'player'),
        ('Baratheon', 'power', '1', 'player')
    `);
}