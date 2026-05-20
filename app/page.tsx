import joinGame from "@/actions/joinGame";
import Area from "@/components/Area";
import MovablePiece from "@/components/MovablePiece";
import Piece from "@/components/Piece";
import RemainingUnits from "@/components/RemainingUnits";
import SubmitButton from "@/components/SubmitButton";
import { auth0 } from "@/lib/auth0";
import { Game } from "@/types/Game";
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

  const [gameRows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.games` LIMIT 1000');

  const game = gameRows[0] as Game;

  const [housePieceRows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.house-pieces` LIMIT 1000');

  const housePieces = housePieceRows as HousePiece[];

  const houseOfPlayer = player?.house;

  return (
    <>
    <div className="board-container">
      <Image
        src="/images/board.jpg"
        alt="The game board should be displaying here..."
        width={1980}
        height={2975}
        loading="eager"
      />
      <Piece
        src="/images/wildling-threat-token.png"
        alt="WTT"
        className={`wildling-threat-token position-${game.wildlingThreat}`}
      />
      <Piece
        src="/images/game-round-marker.png"
        alt="GRM"
        className={`game-round-marker position-${game.round}`}
      />
      {players.map((player, index) => (
        <div key={index}>
          <Piece
            src={`/images/influence-tokens/${player.house}.png`}
            alt={`${player.house}`}
            className={`influence-token iron-throne-track position-${player.ironThroneTrack}`}
          />
          <Piece
            src={`/images/influence-tokens/${player.house}.png`}
            alt={`${player.house}`}
            className={`influence-token fiefdoms-track position-${player.fiefdomsTrack}`}
          />
          <Piece
            src={`/images/influence-tokens/${player.house}.png`}
            alt={`${player.house}`}
            className={`influence-token kings-court-track position-${player.kingsCourtTrack}`}
          />
        </div>
      ))}
      {Array.from({length: 7}, (_, index) => (
        <div key={index} className={`supply-track position-${index}`}>
          {players.filter(player => player.supplyTrack === index).map((player, index) => (
            <Piece
              key={index}
              src={`/images/influence-tokens/${player.house}.png`}
              alt={player.house}
            />
          ))}
        </div>
      ))}
      <Area top={0} left={0} width={10} height={35} housePieces={housePieces.filter(housePiece => housePiece.area === "Bay Of Ice")} houseOfPlayer={houseOfPlayer} />
      <Area top={37} left={0} width={3} height={32} housePieces={housePieces.filter(housePiece => housePiece.area === "Sunset Sea")} houseOfPlayer={houseOfPlayer} />
      <Area top={95} left={15} width={20} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "West Summer Sea")} houseOfPlayer={houseOfPlayer} />
      <Area top={58} left={4} width={7} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "The Golden Sound")} houseOfPlayer={houseOfPlayer} />
      <Area top={54} left={17} width={7} height={10} housePieces={housePieces.filter(housePiece => housePiece.area === "Lannisport")} houseOfPlayer={houseOfPlayer} />
      <Area top={58} left={25} width={11} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Stoney Sept")} houseOfPlayer={houseOfPlayer} />
      <Area top={7} left={32} width={22} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Castle Black")} houseOfPlayer={houseOfPlayer} />
      <Area top={14} left={52} width={13} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Karhold")} houseOfPlayer={houseOfPlayer} />
      <Area top={15} left={17} width={7} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Winterfell")} houseOfPlayer={houseOfPlayer} />
      <Area top={16} left={26} width={14} height={18} housePieces={housePieces.filter(housePiece => housePiece.area === "Winterfell")} houseOfPlayer={houseOfPlayer} />
      <Area top={8} left={65} width={10} height={24} housePieces={housePieces.filter(housePiece => housePiece.area === "The Shivering Sea")} houseOfPlayer={houseOfPlayer} />
      <Area top={22} left={10} width={16} height={14} housePieces={housePieces.filter(housePiece => housePiece.area === "The Stony Shore")} houseOfPlayer={houseOfPlayer} />
      <Area top={24} left={41} width={9} height={11} housePieces={housePieces.filter(housePiece => housePiece.area === "White Harbor")} houseOfPlayer={houseOfPlayer} />
      <Area top={26} left={50} width={10} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Widows Watch")} houseOfPlayer={houseOfPlayer} />
      <Area top={37} left={7} width={14} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Flints Finger")} houseOfPlayer={houseOfPlayer} />
      <Area top={36} left={21} width={9} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Greywater Watch")} houseOfPlayer={houseOfPlayer} />
      <Area top={34} left={30} width={11} height={10} housePieces={housePieces.filter(housePiece => housePiece.area === "Moat Cailin")} houseOfPlayer={houseOfPlayer} />
      <Area top={35} left={43} width={6} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of White Harbor")} houseOfPlayer={houseOfPlayer} />
      <Area top={33} left={66} width={9} height={20} housePieces={housePieces.filter(housePiece => housePiece.area === "The Narrow Sea")} houseOfPlayer={houseOfPlayer} />
      <Area top={50} left={4} width={5} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Ironmans Bay")} houseOfPlayer={houseOfPlayer} />
      <Area top={42} left={9} width={7} height={13} housePieces={housePieces.filter(housePiece => housePiece.area === "Pyke")} houseOfPlayer={houseOfPlayer} />
      <Area top={44} left={16} width={6} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Pyke")} houseOfPlayer={houseOfPlayer} />
      <Area top={44} left={24} width={10} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Seagard")} houseOfPlayer={houseOfPlayer} />
      <Area top={44} left={34} width={10} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "The Twins")} houseOfPlayer={houseOfPlayer} />
      <Area top={41} left={44} width={12} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "The Fingers")} houseOfPlayer={houseOfPlayer} />
      <Area top={56} left={11} width={6} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Lannisport")} houseOfPlayer={houseOfPlayer} />
      <Area top={51} left={26} width={14} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Riverrun")} houseOfPlayer={houseOfPlayer} />
      <Area top={49} left={40} width={10} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "The Mountains Of The Moon")} houseOfPlayer={houseOfPlayer} />
      <Area top={50} left={50} width={16} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "The Eyrie")} houseOfPlayer={houseOfPlayer} />
      <Area top={56} left={36} width={9} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Harrenhall")} houseOfPlayer={houseOfPlayer} />
      <Area top={56} left={45} width={9} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Cracklaw Point")} houseOfPlayer={houseOfPlayer} />
      <Area top={59} left={54} width={7} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "Blackwater Bay")} houseOfPlayer={houseOfPlayer} />
      <Area top={56} left={62} width={13} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Dragonstone")} houseOfPlayer={houseOfPlayer} />
      <Area top={63} left={67} width={7} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Dragonstone")} houseOfPlayer={houseOfPlayer} />
      <Area top={64} left={12} width={12} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "Searoad Marches")} houseOfPlayer={houseOfPlayer} />
      <Area top={64} left={24} width={17} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Blackwater")} houseOfPlayer={houseOfPlayer} />
      <Area top={63} left={43} width={11} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Kings Landing")} houseOfPlayer={houseOfPlayer} />
      <Area top={72} left={12} width={12} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Highgarden")} houseOfPlayer={houseOfPlayer} />
      <Area top={70} left={24} width={20} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "The Reach")} houseOfPlayer={houseOfPlayer} />
      <Area top={69} left={44} width={19} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Kingswood")} houseOfPlayer={houseOfPlayer} />
      <Area top={67} left={63} width={12} height={10} housePieces={housePieces.filter(housePiece => housePiece.area === "Shipbreaker Bay")} houseOfPlayer={houseOfPlayer} />
      <Area top={79} left={7} width={6} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Oldtown")} houseOfPlayer={houseOfPlayer} />
      <Area top={79} left={13} width={7} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "Oldtown")} houseOfPlayer={houseOfPlayer} />
      <Area top={77} left={24} width={13} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Dornish Marches")} houseOfPlayer={houseOfPlayer} />
      <Area top={77} left={37} width={10} height={9} housePieces={housePieces.filter(housePiece => housePiece.area === "The Boneway")} houseOfPlayer={houseOfPlayer} />
      <Area top={73} left={49} width={7} height={9} housePieces={housePieces.filter(housePiece => housePiece.area === "Storms End")} houseOfPlayer={houseOfPlayer} />
      <Area top={75} left={56} width={6} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Storms End")} houseOfPlayer={houseOfPlayer} />
      <Area top={82} left={47} width={19} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Sea Of Dorne")} houseOfPlayer={houseOfPlayer} />
      <Area top={84} left={3} width={9} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "Redwyne Straights")} houseOfPlayer={houseOfPlayer} />
      <Area top={92} left={3} width={10} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "The Arbor")} houseOfPlayer={houseOfPlayer} />
      <Area top={85} left={14} width={11} height={7} housePieces={housePieces.filter(housePiece => housePiece.area === "Three Towers")} houseOfPlayer={houseOfPlayer} />
      <Area top={81} left={25} width={10} height={8} housePieces={housePieces.filter(housePiece => housePiece.area === "Princes Pass")} houseOfPlayer={houseOfPlayer} />
      <Area top={90} left={25} width={14} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Starfall")} houseOfPlayer={houseOfPlayer} />
      <Area top={86} left={35} width={13} height={3} housePieces={housePieces.filter(housePiece => housePiece.area === "Yronwood")} houseOfPlayer={houseOfPlayer} />
      <Area top={90} left={39} width={18} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Salt Shore")} houseOfPlayer={houseOfPlayer} />
      <Area top={86} left={48} width={16} height={4} housePieces={housePieces.filter(housePiece => housePiece.area === "Sunspear")} houseOfPlayer={houseOfPlayer} />
      <Area top={87} left={64} width={7} height={5} housePieces={housePieces.filter(housePiece => housePiece.area === "Port of Sunspear")} houseOfPlayer={houseOfPlayer} />
      <Area top={94} left={39} width={36} height={6} housePieces={housePieces.filter(housePiece => housePiece.area === "East Summer Sea")} houseOfPlayer={houseOfPlayer} />
    </div>
    {houseOfPlayer &&
      <>
      <div>
        You are House {houseOfPlayer}:
        <Piece
          src={`/images/influence-tokens/${houseOfPlayer}.png`}
          alt={houseOfPlayer}
        />
      </div>
      <div>These are your remaining Units:</div>
      <div>
        <RemainingUnits type="footman" house={houseOfPlayer} total={10} housePieces={housePieces} />
        <RemainingUnits type="knight" house={houseOfPlayer} total={5} housePieces={housePieces} />
        <RemainingUnits type="ship" house={houseOfPlayer} total={6} housePieces={housePieces} />
        <RemainingUnits type="siege-engine" house={houseOfPlayer} total={2} housePieces={housePieces} />
      </div>
      <div>Place your Order Tokens:</div>
      <div>
        <MovablePiece id="raid-special" piece={<Piece src="/images/house-pieces/order-tokens/RaidSpecial.png" alt="raid-special" />} />
        <MovablePiece id="raid-1" piece={<Piece src="/images/house-pieces/order-tokens/Raid.png" alt="raid-1" />} />
        <MovablePiece id="raid-2" piece={<Piece src="/images/house-pieces/order-tokens/Raid.png" alt="raid-2" />} />
        <MovablePiece id="march-special" piece={<Piece src="/images/house-pieces/order-tokens/MarchSpecial.png" alt="march-special" />} />
        <MovablePiece id="march" piece={<Piece src="/images/house-pieces/order-tokens/March.png" alt="march" />} />
        <MovablePiece id="march-minus-one" piece={<Piece src="/images/house-pieces/order-tokens/MarchMinusOne.png" alt="march-minus-onel" />} />
        <MovablePiece id="defense-special" piece={<Piece src="/images/house-pieces/order-tokens/DefenseSpecial.png" alt="defense-special" />} />
        <MovablePiece id="defense-1" piece={<Piece src="/images/house-pieces/order-tokens/Defense.png" alt="defense-1" />} />
        <MovablePiece id="defense-2" piece={<Piece src="/images/house-pieces/order-tokens/Defense.png" alt="defense-2" />} />
        <MovablePiece id="support-special" piece={<Piece src="/images/house-pieces/order-tokens/SupportSpecial.png" alt="support-special" />} />
        <MovablePiece id="support-1" piece={<Piece src="/images/house-pieces/order-tokens/Support.png" alt="support-1" />} />
        <MovablePiece id="support-2" piece={<Piece src="/images/house-pieces/order-tokens/Support.png" alt="support-2" />} />
        <MovablePiece id="consolidate-power-special" piece={<Piece src="/images/house-pieces/order-tokens/ConsolidatePowerSpecial.png" alt="consolidate-power-special" />} />
        <MovablePiece id="consolidate-power-1" piece={<Piece src="/images/house-pieces/order-tokens/ConsolidatePower.png" alt="consolidate-power-1" />} />
        <MovablePiece id="consolidate-power-2" piece={<Piece src="/images/house-pieces/order-tokens/ConsolidatePower.png" alt="consolidate-power-2" />} />
      </div>
      </>
    }
    </>
  );
}
