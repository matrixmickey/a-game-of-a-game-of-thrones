import Area from "@/components/Area";
import HousePieceImage from "@/components/HousePieceImage";
import { auth0 } from "@/lib/auth0";
import { HousePiece } from "@/types/HousePiece";
import { Player } from "@/types/Player";
import { BigQuery } from "@google-cloud/bigquery";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export default async function Home() {
  async function joinGame() {
    "use server";

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
      SELECT '${(await auth0.getSession())?.user.email}' AS email, val AS house
      FROM AvailableValues
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

  const session = await auth0.getSession();

  const bigquery = new BigQuery();

  const [playerRows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.players` LIMIT 1000');

  const players = playerRows as Player[];

  const player = session ? players.find(player => player.email === session?.user.email) : undefined;

  if (players.length < 6) {
    if (!session) {
      return "Log in to play";
    } else if (!player) {
      return (
        <form action={joinGame}>
          <button type="submit">Join Game</button>
        </form>
      )
    }
  }

  const [housePieceRows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.house-pieces` LIMIT 1000');

  const housePieces = housePieceRows as HousePiece[];

  return (
    <>
    <div className="board-container">
      <Image
        src="/images/board.jpg"
        alt="The game board should be displaying here..."
        width={1980}
        height={2975}
      />
      <Area top={0} left={0} width={10} height={35} housePieces={housePieces.filter(housePiece => housePiece.area === "Bay Of Ice")} />
      <Area top={37} left={0} width={3} height={32} housePieces={housePieces.filter(housePiece => housePiece.area === "Sunset Sea")} />
      <Area top={95} left={15} width={20} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "West Summer Sea")} />
      <Area top={58} left={4} width={7} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "The Golden Sound")} />
      <Area top={54} left={17} width={7} height={10} housePieces={housePieces.filter(housePiece => housePiece.area === "Lannisport")} />
      <Area top={58} left={25} width={11} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Stoney Sept")} />
    </div>
    {player &&
      <>
      <div>You are House {player.house}</div>
      <div>
        <HousePieceImage id="raid-special" src="/images/house-pieces/order-tokens/RaidSpecial.png" />
        <HousePieceImage id="raid-1" src="/images/house-pieces/order-tokens/Raid.png" />
        <HousePieceImage id="raid-2" src="/images/house-pieces/order-tokens/Raid.png" />
        <HousePieceImage id="march-special" src="/images/house-pieces/order-tokens/MarchSpecial.png" />
        <HousePieceImage id="march" src="/images/house-pieces/order-tokens/March.png" />
        <HousePieceImage id="march-minus-one" src="/images/house-pieces/order-tokens/MarchMinusOne.png" />
        <HousePieceImage id="defense-special" src="/images/house-pieces/order-tokens/DefenseSpecial.png" />
        <HousePieceImage id="defense-1" src="/images/house-pieces/order-tokens/Defense.png" />
        <HousePieceImage id="defense-2" src="/images/house-pieces/order-tokens/Defense.png" />
        <HousePieceImage id="support-special" src="/images/house-pieces/order-tokens/SupportSpecial.png" />
        <HousePieceImage id="support-1" src="/images/house-pieces/order-tokens/Support.png" />
        <HousePieceImage id="support-2" src="/images/house-pieces/order-tokens/Support.png" />
        <HousePieceImage id="consolidate-power-special" src="/images/house-pieces/order-tokens/ConsolidatePowerSpecial.png" />
        <HousePieceImage id="consolidate-power-1" src="/images/house-pieces/order-tokens/ConsolidatePower.png" />
        <HousePieceImage id="consolidate-power-2" src="/images/house-pieces/order-tokens/ConsolidatePower.png" />
      </div>
      </>
    }
    </>
  );
}
