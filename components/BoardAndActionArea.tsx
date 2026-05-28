"use client";

import { Piece } from "@/types/Piece";
import { Player } from "@/types/Player";
import { useState } from "react";
import Area from "./Area";
import DoneForm from "./DoneForm";
import assignOrderTokens from "@/actions/assignOrderTokens";
import SubmitButton from "./SubmitButton";
import RemainingPieces from "./RemainingPieces";

export default function BoardAndActionArea({you, areas, piecesInitial, phase, board, phaseInformation}: {you: Player | undefined, areas: {
    top: number;
    left: number;
    width: number;
    height: number;
    name: string;
    muster: number;
}[], piecesInitial: Piece[], phase: string, board: React.ReactNode, phaseInformation: React.ReactNode}) {    
    const [pieces, setPieces] = useState(piecesInitial);

    const [selectedPiece, setSelectedPiece] = useState(undefined as Piece | undefined);

    return (
        <>
            <div className="board-container">
                {board}
                {areas.map((area, index) => <Area
                    key={index}
                    name={area.name}
                    top={area.top}
                    left={area.left}
                    width={area.width}
                    height={area.height}
                    phase={phase}
                    yourHouse={you?.house}
                    pieces={pieces}
                    setPieces={setPieces}
                    selectedPiece={selectedPiece}
                    setSelectedPiece={setSelectedPiece}
                />)}
            </div>
            {phaseInformation}
            {you && phase === "Planning - Assign Orders" &&
                <>
                    <div>
                        <RemainingPieces house={you.house} type="order" name="raid-special" total={1} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="raid" total={2} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="march-special" total={1} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="march" total={1} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="march-minus-one" total={1} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="defense-special" total={1} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="defense" total={2} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="support-special" total={1} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="support" total={2} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="consolidate-power-special" total={1} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                        <RemainingPieces house={you.house} type="order" name="consolidate-power" total={2} pieces={pieces} setSelectedPiece={setSelectedPiece} />
                    </div>
                    <DoneForm action={assignOrderTokens.bind(null, pieces.filter(piece => piece.house === you.house && piece.type === "unit").map(piece => piece.area), pieces.filter(piece => piece.house === you.house))} submitButton={<SubmitButton notPendingText="Click here when done assigning your Order tokens" pendingText="Submitting..." />} />
                </>
            }
        </>
    );
}