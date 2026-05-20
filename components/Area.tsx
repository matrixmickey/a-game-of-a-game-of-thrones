"use client";

import { HousePiece } from "@/types/HousePiece";
import MovablePiece from "./MovablePiece";
import Piece from "./Piece";

export default function Area({top, left, width, height, housePieces, houseOfPlayer} : {top: number, left: number, width: number, height: number, housePieces: HousePiece[], houseOfPlayer: string | undefined}) {
    return (
        <div
            className="area"
            style={{top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`}}
            onDragOver={ev => ev.preventDefault()}
            onDrop={ev => {
                ev.preventDefault();
                const movablePiece = document.getElementById(ev.dataTransfer.getData('text')) as HTMLDivElement;
                if (!movablePiece) return;
                (ev.currentTarget as HTMLDivElement).appendChild(movablePiece);
            }}
            onClick={ev => {
                const movablePiece = document.getElementsByClassName('selected').item(0);
                if (!movablePiece) return;
                (ev.currentTarget as HTMLDivElement).appendChild(movablePiece);
                movablePiece.classList.remove('selected');
            }}
        >
            {housePieces.map((housePiece, index) => {
                const id = `house-piece-top-${top}-left-${left}-index-${index}`;
                const piece = <Piece key={index} src={`/images/house-pieces/units/${housePiece.type}-${housePiece.house}.png`} alt={id} />
                if (housePiece.house === houseOfPlayer && housePiece.type !== "garrison") {
                    return (
                        <MovablePiece key={index} piece={piece} id={id} />
                    )
                } else {
                    return piece;
                }
            })}
        </div>
    )
}