"use client";

import { Dispatch, SetStateAction } from "react";

export default function MovablePiece({piece, name, nameOfSelectedPiece, setNameOfSelectedPiece}: {piece: React.ReactNode, name: string, nameOfSelectedPiece: string, setNameOfSelectedPiece: Dispatch<SetStateAction<string>>}) {
    return (
        <div
            onDragStart={_ => setNameOfSelectedPiece(name)}
            onClick={_ => setNameOfSelectedPiece(name)}
            className={`movable-piece${name === nameOfSelectedPiece ? " selected" : ""}`}
        >
            {piece}
        </div>
    )
}