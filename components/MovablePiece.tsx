"use client";

import { Piece } from "@/types/Piece";
import { Dispatch, SetStateAction } from "react";

export default function MovablePiece({pieceComponent, thisPiece, pieces, setPieces}: {pieceComponent: React.ReactNode, thisPiece: Piece, pieces: Piece[], setPieces: Dispatch<SetStateAction<Piece[]>>}) {
    function selectPiece() {
        pieces = pieces.map(piece => ({...piece, isSelected: false}));
        const index = pieces.findIndex(piece => piece.house === thisPiece.house && thisPiece.type === piece.type && thisPiece.name === piece.name && thisPiece.area === piece.area);
        setPieces(pieces.with(index, {...pieces[index], isSelected: true}));
    }

    return (
        <div
            onDragStart={selectPiece}
            onClick={ev => {
                ev.stopPropagation();
                selectPiece();
            }}
            className={`movable-piece${thisPiece.isSelected ? " selected" : ""}`}
        >
            {pieceComponent}
        </div>
    )
}