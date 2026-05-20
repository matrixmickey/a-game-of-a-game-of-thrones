import { BigQuery } from "@google-cloud/bigquery";

export default async function createGame() {
    const bigQuery = new BigQuery();

    await bigQuery.query("TRUNCATE TABLE `a-game-of-a-game-of-thrones.dataset.players`");

    await bigQuery.query("TRUNCATE TABLE `a-game-of-a-game-of-thrones.dataset.house-pieces`");

    await bigQuery.query("INSERT INTO `a-game-of-a-game-of-thrones.dataset.games` (wildlingThreat, round, phase) VALUES (2, 1, 'Planning')");

    await bigQuery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.players\` (house, ironThroneTrack, fiefdomsTrack, kingsCourtTrack, supplyTrack, isDone) VALUES
        ('Stark', 3, 4, 2, 1, false),
        ('Greyjoy', 5, 1, 6, 2, false),
        ('Lannister', 2, 6, 1, 2, false),
        ('Martell', 4, 3, 3, 2, false),
        ('Tyrell', 6, 2, 5, 2, false),
        ('Baratheon', 1, 5, 4, 2, false)
    `);

    await bigQuery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.house-pieces\` (house, type, area) VALUES
        ('neutral', '6', 'The Eyrie'),
        ('neutral', '5', 'Kings Landing'),
        ('Stark', 'garrison', 'Winterfell'),
        ('Stark', 'footman', 'White Harbor'),
        ('Stark', 'footman', 'Winterfell'),
        ('Stark', 'knight', 'Winterfell'),
        ('Stark', 'ship', 'The Shivering Sea'),
        ('Stark', 'power', 'player'),
        ('Stark', 'power', 'player'),
        ('Stark', 'power', 'player'),
        ('Stark', 'power', 'player'),
        ('Stark', 'power', 'player'),
        ('Greyjoy', 'garrison', 'Pyke'),
        ('Greyjoy', 'footman', 'Greywater Watch'),
        ('Greyjoy', 'footman', 'Pyke'),
        ('Greyjoy', 'knight', 'Pyke'),
        ('Greyjoy', 'ship', 'Port of Pyke'),
        ('Greyjoy', 'ship', 'Ironmans Bay'),
        ('Greyjoy', 'power', 'player'),
        ('Greyjoy', 'power', 'player'),
        ('Greyjoy', 'power', 'player'),
        ('Greyjoy', 'power', 'player'),
        ('Greyjoy', 'power', 'player'),
        ('Lannister', 'garrison', 'Lannisport'),
        ('Lannister', 'footman', 'Stoney Sept'),
        ('Lannister', 'footman', 'Lannisport'),
        ('Lannister', 'knight', 'Lannisport'),
        ('Lannister', 'ship', 'The Golden Sound'),
        ('Lannister', 'power', 'player'),
        ('Lannister', 'power', 'player'),
        ('Lannister', 'power', 'player'),
        ('Lannister', 'power', 'player'),
        ('Lannister', 'power', 'player'),
        ('Martell', 'garrison', 'Sunspear'),
        ('Martell', 'footman', 'Salt Shore'),
        ('Martell', 'footman', 'Sunspear'),
        ('Martell', 'knight', 'Sunspear'),
        ('Martell', 'ship', 'Sea Of Dorne'),
        ('Martell', 'power', 'player'),
        ('Martell', 'power', 'player'),
        ('Martell', 'power', 'player'),
        ('Martell', 'power', 'player'),
        ('Martell', 'power', 'player'),
        ('Tyrell', 'garrison', 'Highgarden'),
        ('Tyrell', 'footman', 'Dornish Marches'),
        ('Tyrell', 'footman', 'Highgarden'),
        ('Tyrell', 'knight', 'Highgarden'),
        ('Tyrell', 'ship', 'Redwyne Straights'),
        ('Tyrell', 'power', 'player'),
        ('Tyrell', 'power', 'player'),
        ('Tyrell', 'power', 'player'),
        ('Tyrell', 'power', 'player'),
        ('Tyrell', 'power', 'player'),
        ('Baratheon', 'garrison', 'Dragonstone'),
        ('Baratheon', 'footman', 'Kingswood'),
        ('Baratheon', 'footman', 'Dragonstone'),
        ('Baratheon', 'knight', 'Dragonstone'),
        ('Baratheon', 'ship', 'Shipbreaker Bay'),
        ('Baratheon', 'ship', 'Shipbreaker Bay'),
        ('Baratheon', 'power', 'player'),
        ('Baratheon', 'power', 'player'),
        ('Baratheon', 'power', 'player'),
        ('Baratheon', 'power', 'player'),
        ('Baratheon', 'power', 'player')
    `);
}