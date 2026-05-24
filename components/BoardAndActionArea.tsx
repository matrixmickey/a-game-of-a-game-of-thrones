"use client";

import { HousePiece } from "@/types/HousePiece";
import { Player } from "@/types/Player";
import { useState } from "react";
import Area from "./Area";
import MovablePiece from "./MovablePiece";
import Piece from "./Piece";
import DoneForm from "./DoneForm";
import assignOrderTokens from "@/actions/assignOrderTokens";
import SubmitButton from "./SubmitButton";

export default function BoardAndActionArea({you, areas, housePieces, phase, board, phaseInformation}: {you: Player | undefined, areas: {
    top: number;
    left: number;
    width: number;
    height: number;
    name: string;
    muster: number;
}[], housePieces: HousePiece[], phase: string, board: React.ReactNode, phaseInformation: React.ReactNode}) {
    function getIsMovable(housePiece: HousePiece) {
        return phase === "Planning - Assign Orders" ? housePiece.type.startsWith("order-token-") : false;
    }

    const areasWithHousePieceData = areas.map(area => {
        const housePiecesInArea = housePieces.filter(housePiece => housePiece.area === area.name);
        const containsYourUnits = housePiecesInArea.some(housePiece => housePiece.house === you?.house && !["garrison", "power"].includes(housePiece.type));
        const unmovablePiecesInArea = housePiecesInArea.filter(housePieceInArea => !getIsMovable(housePieceInArea));
        const movablePiecesInArea = housePiecesInArea.filter(housePieceInArea => getIsMovable(housePieceInArea));
        return {...area, containsYourUnits, unmovablePiecesInArea, movablePiecesInArea};
    });
    
    const [movablePieces, setMovablePieces] = useState(housePieces.filter(housePiece => getIsMovable(housePiece)));

    const [nameOfSelectedPiece, setNameOfSelectedPiece] = useState("");

    return (
        <>
            <div className="board-container">
                {board}
                {areasWithHousePieceData.map((area, index) => <Area
                    key={index}
                    name={area.name}
                    top={area.top}
                    left={area.left}
                    width={area.width}
                    height={area.height}
                    yourHouse={you?.house}
                    containsYourUnits={area.containsYourUnits}
                    areMultipleMovablePiecesAllowed={false}
                    unmovablePiecesInArea={area.unmovablePiecesInArea}
                    movablePiecesInArea={area.movablePiecesInArea}
                    movablePieces={movablePieces}
                    setMovablePieces={setMovablePieces}
                    nameOfSelectedPiece={nameOfSelectedPiece}
                    setNameOfSelectedPiece={setNameOfSelectedPiece}
                />)}
            </div>
            {phaseInformation}
            <div>
                {["raid-special","raid-1","raid-2","march-special","march","march-minus-one","defense-special","defense-1","defense-2","support-special","support-1","support-2","consolidate-power-special","consolidate-power-1","consolidate-power-2"].filter(nameOfOrderToken => !movablePieces.some(orderToken => orderToken.type === `order-token-${nameOfOrderToken}`)).map((nameOfOrderToken, index) => <MovablePiece key={index} piece={<Piece src={`/images/order-tokens/${["raid-1", "raid-2", "defense-1", "defense-2", "support-1", "support-2", "consolidate-power-1", "consolidate-power-2"].includes(nameOfOrderToken) ? nameOfOrderToken.slice(0, -2) : nameOfOrderToken}.png`} alt={nameOfOrderToken} />} name={`order-token-${nameOfOrderToken}`} nameOfSelectedPiece={nameOfSelectedPiece} setNameOfSelectedPiece={setNameOfSelectedPiece} />)}
            </div>
            <DoneForm action={assignOrderTokens.bind(null, areasWithHousePieceData.filter(area => area.containsYourUnits).map(area => area.name), housePieces)} submitButton={<SubmitButton notPendingText="Click here when done assigning your Order tokens" pendingText="Submitting..." />} />
        </>
    );
}