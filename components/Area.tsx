"use client";

import { Piece } from "@/types/Piece";
import PieceComponent from "./Piece";
import MovablePiece from "./MovablePiece";
import { Dispatch, SetStateAction } from "react";

export default function Area({name, top, left, width, height, phase, yourHouse, pieces, setPieces} : {name: string, top: number, left: number, width: number, height: number, phase: string, yourHouse: string | undefined, pieces: Piece[], setPieces: Dispatch<SetStateAction<Piece[]>>}) {
    function movePieceHere() {
        setPieces(pieces.map(piece => piece.isSelected ? {...piece, area: name, isSelected: false} : piece));
    }

    const containsYourUnits = pieces.some(piece => piece.house === yourHouse && piece.type === "unit" && piece.area === name);

    return (
        <div
            className="area"
            style={{top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`}}
            onDragOver={ev => ev.preventDefault()}
            onDrop={containsYourUnits ? ev => {
                ev.preventDefault();
                movePieceHere();
            } : undefined}
            onClick={containsYourUnits ? movePieceHere : undefined}
        >
            {pieces.filter(piece => piece.area !== name ? false : piece.house !== yourHouse ? true : phase === "Planning - Assign Orders" ? piece.type !== "order" : true).map((unmovablePiece, index) => {
                const id = `house-piece-top-${top}-left-${left}-index-${index}`;
                return <PieceComponent key={index} src={`/images/pieces/${unmovablePiece.type}/${unmovablePiece.name}${unmovablePiece.type !== "order" ? `/${unmovablePiece.house}` : ""}.png`} alt={id} />
            })}
            {pieces.filter(piece => piece.area !== name ? false : piece.house !== yourHouse ? false : phase === "Planning - Assign Orders" ? piece.type === "order" : false).map((movablePiece, index) => {
                return <MovablePiece key={index} pieceComponent={<PieceComponent src={`/images/pieces/${movablePiece.type}/${movablePiece.name}${movablePiece.type !== "order" ? `/${movablePiece.house}` : ""}.png`} alt={movablePiece.name} />} thisPiece={movablePiece} pieces={pieces} setPieces={setPieces} />
            })}
        </div>
    )
}