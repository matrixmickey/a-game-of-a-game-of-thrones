"use client";

import { HousePiece } from "@/types/HousePiece";
import Piece from "./Piece";

export default function Area({id, top, left, width, height, housePieces, containsYourUnits} : {id: string, top: number, left: number, width: number, height: number, housePieces: HousePiece[], containsYourUnits: boolean}) {
    return (
        <div
            id={id}
            className={`area${containsYourUnits ? " contains-your-units" : ""}`}
            style={{top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`}}
            onDragOver={containsYourUnits ? ev => ev.preventDefault() : undefined}
            onDrop={containsYourUnits ?  ev => {
                ev.preventDefault();
                const movablePiece = document.getElementById(ev.dataTransfer.getData('text')) as HTMLDivElement;
                if (!movablePiece) return;
                (ev.currentTarget as HTMLDivElement).appendChild(movablePiece);
            } : undefined}
            onClick={containsYourUnits ? ev => {
                const movablePiece = document.getElementsByClassName('selected').item(0);
                if (!movablePiece) return;
                (ev.currentTarget as HTMLDivElement).appendChild(movablePiece);
                movablePiece.classList.remove('selected');
            } : undefined}
        >
            {housePieces.map((housePiece, index) => {
                const id = `house-piece-top-${top}-left-${left}-index-${index}`;
                return <Piece key={index} src={`/images/house-pieces/${housePiece.type}-${housePiece.house}.png`} alt={id} />
            })}
        </div>
    )
}