"use client";

import { HousePiece } from "@/types/HousePiece";
import HousePieceImage from "./HousePieceImage";

export default function Area({top, left, width, height, housePieces} : {top: number, left: number, width: number, height: number, housePieces: HousePiece[]}) {
    return (
        <div
            className="area"
            style={{top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`}}
            onDragOver={ev => ev.preventDefault()}
            onDrop={ev => {
                ev.preventDefault();
                (ev.currentTarget as HTMLDivElement).appendChild(document.getElementById(ev.dataTransfer.getData('text')) as HTMLImageElement)
            }}
            onClick={ev => {
                const token = document.getElementsByClassName('selected').item(0);
                if (!token) return;
                (ev.currentTarget as HTMLDivElement).appendChild(token);
                token.classList.remove('selected');
            }}
        >
            {housePieces.map((housePiece, index) => (
                <HousePieceImage key={index} id={`house-piece-top-${top}-left-${left}-index-${index}`} src={`/images/house-pieces/units/${housePiece.type}-${housePiece.house}.png`} isMovable={housePiece.house !== 'neutral'} />
            ))}
        </div>
    )
}