import createGame from "@/actions/createGame";
import joinGame from "@/actions/joinGame";
import BoardAndActionArea from "@/components/BoardAndActionArea";
import PieceComponent from "@/components/Piece";
import RemainingPieces from "@/components/RemainingPieces";
import SubmitButton from "@/components/SubmitButton";
import { auth0 } from "@/lib/auth0";
import { Game } from "@/types/Game";
import { Piece } from "@/types/Piece";
import { Player } from "@/types/Player";
import { BigQuery } from "@google-cloud/bigquery";
import Image from "next/image";

export default async function Home() {
  const session = await auth0.getSession();

  const bigquery = new BigQuery();

  let [gameRows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.games` LIMIT 1000');

  if (gameRows.length === 0) {
    await createGame();
    [gameRows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.games` LIMIT 1000');
  }

  const game = gameRows[0] as Game;

  const [playerRows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.players` LIMIT 1000');

  const players = playerRows as Player[];

  const assignedPlayers = players.filter(player => player.email);

  const you = session ? assignedPlayers.find(player => player.email === session?.user.email) : undefined;

  if (assignedPlayers.length < 6) {
    if (!session) {
      return "Log in to play";
    } else if (!you) {
      return (
        <form action={joinGame}>
          <SubmitButton notPendingText="Join Game" pendingText="Joining..." />
        </form>
      )
    }
  }

  const [pieceRows] = await bigquery.query('SELECT * FROM `a-game-of-a-game-of-thrones.dataset.pieces` LIMIT 1000');

  const pieces = pieceRows as Piece[];

  const areas = [
    {top: 0, left: 0, width: 10, height: 35, name: "Bay Of Ice", muster: 0},
    {top: 37, left: 0, width: 3, height: 32, name: "Sunset Sea", muster: 0},
    {top: 95, left: 15, width: 20, height: 5, name: "West Summer Sea", muster: 0},
    {top: 58, left: 4, width: 7, height: 8, name: "The Golden Sound", muster: 0},
    {top: 54, left: 17, width: 7, height: 10, name: "Lannisport", muster: 2},
    {top: 58, left: 25, width: 11, height: 6, name: "Stoney Sept", muster: 0},
    {top: 7, left: 32, width: 22, height: 6, name: "Castle Black", muster: 0},
    {top: 14, left: 52, width: 13, height: 7, name: "Karhold", muster: 0},
    {top: 15, left: 17, width: 7, height: 5, name: "Port of Winterfell", muster: 0},
    {top: 16, left: 26, width: 14, height: 18, name: "Winterfell", muster: 2},
    {top: 8, left: 65, width: 10, height: 24, name: "The Shivering Sea", muster: 0},
    {top: 22, left: 10, width: 16, height: 14, name: "The Stony Shore", muster: 0},
    {top: 24, left: 41, width: 9, height: 11, name: "White Harbor", muster: 1},
    {top: 26, left: 50, width: 10, height: 7, name: "Widows Watch", muster: 0},
    {top: 37, left: 7, width: 14, height: 5, name: "Flints Finger", muster: 1},
    {top: 36, left: 21, width: 9, height: 7, name: "Greywater Watch", muster: 0},
    {top: 34, left: 30, width: 11, height: 10, name: "Moat Cailin", muster: 1},
    {top: 35, left: 43, width: 6, height: 4, name: "Port of White Harbor", muster: 0},
    {top: 33, left: 66, width: 9, height: 20, name: "The Narrow Sea", muster: 0},
    {top: 50, left: 4, width: 5, height: 7, name: "Ironmans Bay", muster: 0},
    {top: 42, left: 9, width: 7, height: 13, name: "Pyke", muster: 2},
    {top: 44, left: 16, width: 6, height: 5, name: "Port of Pyke", muster: 0},
    {top: 44, left: 24, width: 10, height: 7, name: "Seagard", muster: 2},
    {top: 44, left: 34, width: 10, height: 5, name: "The Twins", muster: 0},
    {top: 41, left: 44, width: 12, height: 7, name: "The Fingers", muster: 0},
    {top: 56, left: 11, width: 6, height: 6, name: "Port of Lannisport", muster: 0},
    {top: 51, left: 26, width: 14, height: 5, name: "Riverrun", muster: 2},
    {top: 49, left: 40, width: 10, height: 7, name: "The Mountains Of The Moon", muster: 0},
    {top: 50, left: 50, width: 16, height: 6, name: "The Eyrie", muster: 1},
    {top: 56, left: 36, width: 9, height: 6, name: "Harrenhall", muster: 1},
    {top: 56, left: 45, width: 9, height: 7, name: "Cracklaw Point", muster: 1},
    {top: 59, left: 54, width: 7, height: 8, name: "Blackwater Bay", muster: 0},
    {top: 56, left: 62, width: 13, height: 7, name: "Dragonstone", muster: 2},
    {top: 63, left: 67, width: 7, height: 4, name: "Port of Dragonstone", muster: 0},
    {top: 64, left: 12, width: 12, height: 8, name: "Searoad Marches", muster: 0},
    {top: 64, left: 24, width: 17, height: 6, name: "Blackwater", muster: 0},
    {top: 63, left: 43, width: 11, height: 6, name: "Kings Landing", muster: 2},
    {top: 72, left: 12, width: 12, height: 7, name: "Highgarden", muster: 2},
    {top: 70, left: 24, width: 20, height: 7, name: "The Reach", muster: 1},
    {top: 69, left: 44, width: 19, height: 4, name: "Kingswood", muster: 0},
    {top: 67, left: 63, width: 12, height: 10, name: "Shipbreaker Bay", muster: 0},
    {top: 79, left: 7, width: 6, height: 5, name: "Port of Oldtown", muster: 0},
    {top: 79, left: 13, width: 7, height: 6, name: "Oldtown", muster: 2},
    {top: 77, left: 24, width: 13, height: 4, name: "Dornish Marches", muster: 0},
    {top: 77, left: 37, width: 10, height: 9, name: "The Boneway", muster: 0},
    {top: 73, left: 49, width: 7, height: 9, name: "Storms End", muster: 1},
    {top: 75, left: 56, width: 6, height: 4, name: "Port of Storms End", muster: 0},
    {top: 82, left: 47, width: 19, height: 4, name: "Sea Of Dorne", muster: 0},
    {top: 84, left: 3, width: 9, height: 8, name: "Redwyne Straights", muster: 0},
    {top: 92, left: 3, width: 10, height: 5, name: "The Arbor", muster: 0},
    {top: 85, left: 14, width: 11, height: 7, name: "Three Towers", muster: 0},
    {top: 81, left: 25, width: 10, height: 8, name: "Princes Pass", muster: 0},
    {top: 90, left: 25, width: 14, height: 5, name: "Starfall", muster: 1},
    {top: 86, left: 35, width: 13, height: 3, name: "Yronwood", muster: 1},
    {top: 90, left: 39, width: 18, height: 4, name: "Salt Shore", muster: 0},
    {top: 86, left: 48, width: 16, height: 4, name: "Sunspear", muster: 2},
    {top: 87, left: 64, width: 7, height: 5, name: "Port of Sunspear", muster: 0},
    {top: 94, left: 39, width: 36, height: 6, name: "East Summer Sea", muster: 0}
  ];

  return (
    <>
    <BoardAndActionArea you={you} areas={areas} piecesInitial={pieces} phase={game.phase} board={
      <>
        <Image
          src="/images/board.jpg"
          alt="The game board should be displaying here..."
          width={1980}
          height={2975}
          loading="eager"
        />
        <PieceComponent
          src="/images/pieces/wildling-threat-token.png"
          alt="WTT"
          className={`wildling-threat-token position-${game.wildlingThreat}`}
        />
        <PieceComponent
          src="/images/pieces/game-round-marker.png"
          alt="GRM"
          className={`game-round-marker position-${game.round}`}
        />
        {players.map((player, index) => (
          <div key={index}>
            <PieceComponent
              src={`/images/pieces/influence/${player.house}.png`}
              alt={`${player.house}`}
              className={`influence-token iron-throne-track position-${player.ironThroneTrack}`}
            />
            <PieceComponent
              src={`/images/pieces/influence/${player.house}.png`}
              alt={`${player.house}`}
              className={`influence-token fiefdoms-track position-${player.fiefdomsTrack}`}
            />
            <PieceComponent
              src={`/images/pieces/influence/${player.house}.png`}
              alt={`${player.house}`}
              className={`influence-token kings-court-track position-${player.kingsCourtTrack}`}
            />
          </div>
        ))}
        {Array.from({length: 7}, (_, index) => (
          <div key={index} className={`supply-track position-${index}`}>
            {players.filter(player => player.supplyTrack === index).map((player, index) => (
              <PieceComponent
                key={index}
                src={`/images/pieces/influence/${player.house}.png`}
                alt={player.house}
              />
            ))}
          </div>
        ))}
        {Array.from({length: 7}, (_, index) => (
          <div key={index} className={`victory-track position-${index + 1}`}>
            {players.filter(player => [...new Set(pieces.filter(piece => piece.house === player.house).map(piece => piece.area))].filter(areaContainingPieceOfPlayer => (areas.find(area => area.name === areaContainingPieceOfPlayer)?.muster ?? 0) > 0).length === index + 1).map((player, index) => (
              <PieceComponent
                key={index}
                src={`/images/pieces/influence/${player.house}.png`}
                alt={player.house}
              />
            ))}
          </div>
        ))}
      </>
    } phaseInformation=
    {you &&
      <>
      <div>Phase: {game.phase}</div>
      <div>What you need to do right now:</div>
      {you.isDone ?
        <div>Nothing right now. Waiting on Houses: {players.filter(player => !player.isDone).map(player => <div>player.house</div>)}</div>
      : game.phase === 'Planning - Assign Orders' &&
        <>
        <div>Place exactly one Order token on each area you control that contains at least one of your units (Footman, Knight, Ship, or Siege Engine). The other players will not see these Order tokens until all players have submitted their assginments. These are your Order tokens:</div>
        </>
      }
      </>
    } />
    {you &&
      <div className="info">
        <div>
          You are House {you.house}:
          <PieceComponent
            src={`/images/pieces/influence/${you.house}.png`}
            alt={you.house}
          />
        </div>
        <div>These are your Available Units:</div>
        <div>
          <RemainingPieces house={you.house} type="unit" name="footman" total={10} pieces={pieces} />
          <RemainingPieces house={you.house} type="unit" name="knight" total={5} pieces={pieces} />
          <RemainingPieces house={you.house} type="unit" name="ship" total={6} pieces={pieces} />
          <RemainingPieces house={you.house} type="unit" name="siege-engine" total={2} pieces={pieces} />
        </div>
        <div>This is your Available Power:</div>
        <div>
          {pieces.filter(piece => piece.house === you.house && piece.type === "power" && piece.area === "player").map((_, index) => (<PieceComponent key={index} src={`/images/pieces/power/1/${you.house}.png`} alt={`power token ${you.house}`} />))}
        </div>
      </div>
    }
    <div className="info">
      <div>This is the Available Power of everyone else:</div>
      <div>
        {pieces.filter(piece => piece.house !== you?.house && piece.type === "power" && piece.area === "player").map((piece, index) => (<PieceComponent key={index} src={`/images/pieces/power/1/${piece.house}.png`} alt={`power token ${piece.house}`} />))}
      </div>
      <div>This is the Power Pool:</div>
      <div>
        {players.map((player, index) => (<RemainingPieces key={index} house={player.house} type="power" name="1" total={20} pieces={pieces} />))}
      </div>
    </div>
    </>
  );
}
