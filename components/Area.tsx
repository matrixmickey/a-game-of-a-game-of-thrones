"use client";

import { Piece } from "@/types/Piece";
import PieceComponent from "./Piece";
import MovablePiece from "./MovablePiece";
import { Dispatch, SetStateAction } from "react";

export default function Area({name, top, left, width, height, phase, yourHouse, pieces, setPieces, selectedPiece, setSelectedPiece} : {name: string, top: number, left: number, width: number, height: number, phase: string, yourHouse: string | undefined, pieces: Piece[], setPieces: Dispatch<SetStateAction<Piece[]>>, selectedPiece: Piece | undefined, setSelectedPiece: Dispatch<SetStateAction<Piece | undefined>>}) {
    function addMovablePiece() {
        if (!yourHouse || !selectedPiece) return;

        if (pieces.some(piece => piece.house === selectedPiece.house && selectedPiece.type === piece.type && selectedPiece.name === piece.name && selectedPiece.area === piece.area)) {
            setPieces(pieces.map(piece => piece.house === selectedPiece.house && selectedPiece.type === piece.type && selectedPiece.name === piece.name && selectedPiece.area === piece.area ? {...piece, area: name} : piece));
        } else {
            setPieces([...pieces, {...selectedPiece, area: name}]);
        }
        
        setSelectedPiece(undefined);
    }

    return (
        <div
            className="area"
            style={{top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`}}
            onDragOver={ev => ev.preventDefault()}
            onDrop={ev => {
                ev.preventDefault();
                addMovablePiece();
            }}
            onClick={_ => {
                addMovablePiece();
            }}
        >
            {pieces.filter(piece => piece.area !== name ? false : piece.house !== yourHouse ? true : phase === "Planning - Assign Orders" ? piece.type !== "order" : true).map((unmovablePiece, index) => {
                const id = `house-piece-top-${top}-left-${left}-index-${index}`;
                return <PieceComponent key={index} src={`/images/pieces/${unmovablePiece.type}/${unmovablePiece.name}${unmovablePiece.type !== "order" ? `/${unmovablePiece.house}` : ""}.png`} alt={id} />
            })}
            {pieces.filter(piece => piece.area !== name ? false : piece.house !== yourHouse ? false : phase === "Planning - Assign Orders" ? piece.type === "order" : false).map((movablePiece, index) => {
                return <MovablePiece key={index} pieceComponent={<PieceComponent src={`/images/pieces/${movablePiece.type}/${movablePiece.name}${movablePiece.type !== "order" ? `/${movablePiece.house}` : ""}.png`} alt={movablePiece.name} />} piece={movablePiece} setSelectedPiece={setSelectedPiece} />
            })}
        </div>
    )
}