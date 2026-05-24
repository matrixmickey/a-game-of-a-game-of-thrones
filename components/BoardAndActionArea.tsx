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

export default function BoardAndActionArea({you, areas, housePieces, board, phaseInformation}: {you: Player | undefined, areas: {
    top: number;
    left: number;
    width: number;
    height: number;
    name: string;
    muster: number;
}[], housePieces: HousePiece[], board: React.ReactNode, phaseInformation: React.ReactNode}) {
    const areasWithHousePieceData = areas.map(area => {
        const housePiecesInArea = housePieces.filter(housePiece => housePiece.area === area.name && !housePiece.type.startsWith("order-token-"));
        const containsYourUnits = housePiecesInArea.some(housePiece => housePiece.house === you?.house && !["garrison", "power"].includes(housePiece.type));
        return {...area, housePieces: housePiecesInArea, containsYourUnits};
    });
    
    const [orderTokens, setOrderTokens] = useState(housePieces.filter(housePiece => housePiece.type.startsWith("order-token-")));

    const [nameOfSelectedPiece, setNameOfSelectedPiece] = useState("");

    return (
        <>
            <div className="board-container">
                {board}
                {areasWithHousePieceData.map((area, index) => <Area key={index} name={area.name} top={area.top} left={area.left} width={area.width} height={area.height} housePieces={area.housePieces} yourHouse={you?.house} containsYourUnits={area.containsYourUnits} orderTokens={orderTokens} setOrderTokens={setOrderTokens} nameOfSelectedPiece={nameOfSelectedPiece} setNameOfSelectedPiece={setNameOfSelectedPiece} />)}
            </div>
            {phaseInformation}
            <div>
                {["raid-special","raid-1","raid-2","march-special","march","march-minus-one","defense-special","defense-1","defense-2","support-special","support-1","support-2","consolidate-power-special","consolidate-power-1","consolidate-power-2"].filter(nameOfOrderToken => !orderTokens.some(orderToken => orderToken.type === `order-token-${nameOfOrderToken}`)).map((nameOfOrderToken, index) => <MovablePiece key={index} piece={<Piece src={`/images/order-tokens/${nameOfOrderToken}.png`} alt={nameOfOrderToken} />} name={nameOfOrderToken} nameOfSelectedPiece={nameOfSelectedPiece} setNameOfSelectedPiece={setNameOfSelectedPiece} />)}
            </div>
            <DoneForm action={assignOrderTokens.bind(null, areasWithHousePieceData.filter(area => area.containsYourUnits).map(area => area.name), housePieces)} submitButton={<SubmitButton notPendingText="Click here when done assigning your Order tokens" pendingText="Submitting..." />} />
        </>
    );
}