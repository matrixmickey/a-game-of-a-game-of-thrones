import Area from "@/components/Area";
import HousePieceImage from "@/components/HousePieceImage";
import { auth0 } from "@/lib/auth0";
import { HousePiece } from "@/types/HousePiece";
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

  const housePieces = rows as HousePiece[];

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
    <div>
      {session ? 
      <>
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
      </>
      : "Log in to play"}
    </div>
    </>
  );
}
