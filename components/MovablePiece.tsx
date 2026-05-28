"use client";

import { Piece } from "@/types/Piece";
import { Dispatch, SetStateAction, useState } from "react";

export default function MovablePiece({pieceComponent, piece, setSelectedPiece}: {pieceComponent: React.ReactNode, piece: Piece, setSelectedPiece: Dispatch<SetStateAction<Piece | undefined>>}) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div
            onDragStart={_ => setSelectedPiece(piece)}
            onClick={_ => {
                setSelectedPiece(piece);
                setIsSelected(true);
            }}
            className={`movable-piece${isSelected ? " selected" : ""}`}
        >
            {pieceComponent}
        </div>
    )
}