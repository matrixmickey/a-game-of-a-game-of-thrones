"use client";

import { Piece } from "@/types/Piece";
import { Player } from "@/types/Player";
import { useState } from "react";
import Area from "./Area";
import DoneForm from "./DoneForm";
import assignOrderTokens from "@/actions/assignOrderTokens";
import SubmitButton from "./SubmitButton";
import MovablePiece from "./MovablePiece";
import PieceComponent from "./Piece";

export default function BoardAndActionArea({you, areas, piecesInitial, phase, board, phaseInformation}: {you: Player | undefined, areas: {
    top: number;
    left: number;
    width: number;
    height: number;
    name: string;
    muster: number;
}[], piecesInitial: Piece[], phase: string, board: React.ReactNode, phaseInformation: React.ReactNode}) {
    const piecesInitialLocal = [...piecesInitial];

    function addPieces(house: string, type: string, name: string, total: number) {
        for (let i = 0; i < total - piecesInitial.filter(piece => piece.house === house && piece.type === type && piece.name === name).length; i++) {
            piecesInitialLocal.push({house, type, name, area: "player", isSelected: false});
        }
    }

    if (you && phase === "Planning - Assign Orders") {
        addPieces(you.house, "order", "raid-special", 1);
        addPieces(you.house, "order", "raid", 2);
        addPieces(you.house, "order", "march-special", 1);
        addPieces(you.house, "order", "march", 1);
        addPieces(you.house, "order", "march-minus-one", 1);
        addPieces(you.house, "order", "defense-special", 1);
        addPieces(you.house, "order", "defense", 2);
        addPieces(you.house, "order", "support-special", 1);
        addPieces(you.house, "order", "support", 2);
        addPieces(you.house, "order", "consolidate-power-special", 1);
        addPieces(you.house, "order", "consolidate-power", 2);
    }

    const [pieces, setPieces] = useState(piecesInitialLocal);

    function removePieceFromBoard() {
        setPieces(pieces.map(piece => piece.isSelected ? {...piece, area: "player", isSelected: false} : piece));
    }

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
                    you={you}
                    pieces={pieces}
                    setPieces={setPieces}
                />)}
            </div>
            {phaseInformation}
            {you && !you.isDone && phase === "Planning - Assign Orders" &&
                <>
                    <div
                        onDragOver={ev => ev.preventDefault()}
                        onDrop={ev => {
                            ev.preventDefault();
                            removePieceFromBoard();
                        }}
                        onClick={removePieceFromBoard}
                    >
                        {pieces.filter(piece => piece.type === "order" && piece.area === "player").map((piece, index) => <MovablePiece key={index} pieceComponent={<PieceComponent src={`/images/pieces/order/${piece.name}.png`} alt={`${piece.name} ${piece.house}`} />} thisPiece={piece} pieces={pieces} setPieces={setPieces} />)}
                    </div>
                    <DoneForm action={assignOrderTokens.bind(null, [...new Set(pieces.filter(piece => piece.house === you.house && piece.type === "unit").map(piece => piece.area))], pieces.filter(piece => piece.house === you.house && piece.type === "order" && piece.area !== "player"))} submitButton={<SubmitButton notPendingText="Click here when done assigning your Order tokens" pendingText="Submitting..." />} />
                </>
            }
        </>
    );
}