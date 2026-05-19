import joinGame from "@/actions/joinGame";
import Area from "@/components/Area";
import HousePieceImage from "@/components/HousePieceImage";
import SubmitButton from "@/components/SubmitButton";
import UnitsWithoutArea from "@/components/UnitsWithoutArea";
import { auth0 } from "@/lib/auth0";
import { HousePiece } from "@/types/HousePiece";
import { Player } from "@/types/Player";
import { BigQuery } from "@google-cloud/bigquery";
import Image from "next/image";

export default async function Home() {
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
          <SubmitButton notPendingText="Join Game" pendingText="Joining..." />
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
      <Area top={7} left={32} width={22} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Castle Black")} />
      <Area top={14} left={52} width={13} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Karhold")} />
      <Area top={15} left={17} width={7} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Winterfell")} />
      <Area top={16} left={26} width={14} height={18} housePieces={housePieces.filter(housePiece => housePiece.area === "Winterfell")} />
      <Area top={8} left={65} width={10} height={24} housePieces={housePieces.filter(housePiece => housePiece.area === "The Shivering Sea")} />
      <Area top={22} left={10} width={16} height={14} housePieces={housePieces.filter(housePiece => housePiece.area === "The Stony Shore")} />
      <Area top={24} left={41} width={9} height={11} housePieces={housePieces.filter(housePiece => housePiece.area === "White Harbor")} />
      <Area top={26} left={50} width={10} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Widows Watch")} />
      <Area top={37} left={7} width={14} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Flints Finger")} />
      <Area top={36} left={21} width={9} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Greywater Watch")} />
      <Area top={34} left={30} width={11} height={10} housePieces={housePieces.filter(housePiece => housePiece.area === "Moat Cailin")} />
      <Area top={35} left={43} width={6} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of White Harbor")} />
      <Area top={33} left={66} width={9} height={20} housePieces={housePieces.filter(housePiece => housePiece.area === "The Narrow Sea")} />
      <Area top={50} left={4} width={5} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Ironmans Bay")} />
      <Area top={42} left={9} width={7} height={13} housePieces={housePieces.filter(housePiece => housePiece.area === "Pyke")} />
      <Area top={44} left={16} width={6} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Pyke")} />
      <Area top={44} left={24} width={10} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Seagard")} />
      <Area top={44} left={34} width={10} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "The Twins")} />
      <Area top={41} left={44} width={12} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "The Fingers")} />
      <Area top={56} left={11} width={6} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Lannisport")} />
      <Area top={51} left={26} width={14} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Riverrun")} />
      <Area top={49} left={40} width={10} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "The Mountains Of The Moon")} />
      <Area top={50} left={50} width={16} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "The Eyrie")} />
      <Area top={56} left={36} width={9} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Harrenhall")} />
      <Area top={56} left={45} width={9} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Cracklaw Point")} />
      <Area top={59} left={54} width={7} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "Blackwater Bay")} />
      <Area top={56} left={62} width={13} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Dragonstone")} />
      <Area top={63} left={67} width={7} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Dragonstone")} />
      <Area top={64} left={12} width={12} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "Searoad Marches")} />
      <Area top={64} left={24} width={17} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Blackwater")} />
      <Area top={63} left={43} width={11} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Kings Landing")} />
      <Area top={72} left={12} width={12} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Highgarden")} />
      <Area top={70} left={24} width={20} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "The Reach")} />
      <Area top={69} left={44} width={19} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Kingswood")} />
      <Area top={67} left={63} width={12} height={10} housePieces={housePieces.filter(housePiece => housePiece.area === "Shipbreaker Bay")} />
      <Area top={79} left={7} width={6} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Oldtown")} />
      <Area top={79} left={13} width={7} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Oldtown")} />
      <Area top={77} left={24} width={13} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Dornish Marches")} />
      <Area top={77} left={37} width={10} height={9} housePieces={housePieces.filter(housePiece => housePiece.area === "The Boneway")} />
      <Area top={73} left={49} width={7} height={9} housePieces={housePieces.filter(housePiece => housePiece.area === "Storms End")} />
      <Area top={75} left={56} width={6} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Storms End")} />
      <Area top={82} left={47} width={19} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Sea Of Dorne")} />
      <Area top={84} left={3} width={9} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "Redwyne Straights")} />
      <Area top={92} left={3} width={10} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "The Arbor")} />
      <Area top={85} left={14} width={11} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Three Towers")} />
      <Area top={81} left={25} width={10} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "Princes Pass")} />
      <Area top={90} left={25} width={14} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Starfall")} />
      <Area top={86} left={35} width={13} height={3} housePieces={housePieces.filter(housePiece => housePiece.area === "Yronwood")} />
      <Area top={90} left={39} width={18} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Salt Shore")} />
      <Area top={86} left={48} width={16} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Sunspear")} />
      <Area top={87} left={64} width={7} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Sunspear")} />
      <Area top={94} left={39} width={36} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "East Summer Sea")} />
    </div>
    {player &&
      <>
      <div>You are House {player.house}</div>
      <div>
        <UnitsWithoutArea type="footman" house={player.house} total={10} housePieces={housePieces} />
        <UnitsWithoutArea type="knight" house={player.house} total={5} housePieces={housePieces} />
        <UnitsWithoutArea type="ship" house={player.house} total={6} housePieces={housePieces} />
        <UnitsWithoutArea type="siege-engine" house={player.house} total={2} housePieces={housePieces} />
      </div>
      <div>Place your Order Tokens:</div>
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
