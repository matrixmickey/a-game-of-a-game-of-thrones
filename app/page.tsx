import Area from "@/components/Area";
import HousePiece from "@/components/HousePiece";
import { auth0 } from "@/lib/auth0";
import { BigQuery } from "@google-cloud/bigquery";
import Image from "next/image";

export default async function Home() {
  const session = await auth0.getSession();

  const bigquery = new BigQuery();

  let [rows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.house-pieces` LIMIT 1000');

  if (rows.length === 0) {
    await bigquery.query(`INSERT INTO \`a-game-of-a-game-of-thrones.dataset.house-pieces\` (house, type, area) VALUES
      ('Lannister', 'footman', 'Stoney Sept'),
      ('Lannister', 'footman', 'Lannisport'),
      ('Lannister', 'knight', 'Lannisport'),
      ('Lannister', 'ship', 'The Golden Sound');
    `);
    [rows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.house-pieces` LIMIT 1000');
  }

  return (
    <>
    <div className="board-container">
      <Image
        src="/images/board.jpg"
        alt="The game board should be displaying here..."
        width={1980}
        height={2975}
      />
      <Area top={0} left={0} width={10} height={35} />
      <Area top={37} left={0} width={3} height={32} />
      <Area top={95} left={15} width={20} height={5} />
    </div>
    <div>
      {session ? 
      <>
      <HousePiece id="raid-special" src="/images/house-pieces/order-tokens/RaidSpecial.png" />
      <HousePiece id="raid-1" src="/images/house-pieces/order-tokens/Raid.png" />
      <HousePiece id="raid-2" src="/images/house-pieces/order-tokens/Raid.png" />
      <HousePiece id="march-special" src="/images/house-pieces/order-tokens/MarchSpecial.png" />
      <HousePiece id="march" src="/images/house-pieces/order-tokens/March.png" />
      <HousePiece id="march-minus-one" src="/images/house-pieces/order-tokens/MarchMinusOne.png" />
      <HousePiece id="defense-special" src="/images/house-pieces/order-tokens/DefenseSpecial.png" />
      <HousePiece id="defense-1" src="/images/house-pieces/order-tokens/Defense.png" />
      <HousePiece id="defense-2" src="/images/house-pieces/order-tokens/Defense.png" />
      <HousePiece id="support-special" src="/images/house-pieces/order-tokens/SupportSpecial.png" />
      <HousePiece id="support-1" src="/images/house-pieces/order-tokens/Support.png" />
      <HousePiece id="support-2" src="/images/house-pieces/order-tokens/Support.png" />
      <HousePiece id="consolidate-power-special" src="/images/house-pieces/order-tokens/ConsolidatePowerSpecial.png" />
      <HousePiece id="consolidate-power-1" src="/images/house-pieces/order-tokens/ConsolidatePower.png" />
      <HousePiece id="consolidate-power-2" src="/images/house-pieces/order-tokens/ConsolidatePower.png" />
      </>
      : "Log in to play"}
    </div>
    <div>Rows returned from query: {rows.length}</div>
    </>
  );
}
