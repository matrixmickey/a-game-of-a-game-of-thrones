"use client";

import { HousePiece } from "@/types/HousePiece";
import Piece from "./Piece";
import MovablePiece from "./MovablePiece";
import { Dispatch, SetStateAction } from "react";

export default function Area({name, top, left, width, height, yourHouse, containsYourUnits, areMultipleMovablePiecesAllowed, unmovablePiecesInArea, movablePiecesInArea, movablePieces, setMovablePieces, nameOfSelectedPiece, setNameOfSelectedPiece} : {name: string, top: number, left: number, width: number, height: number, yourHouse: string | undefined, containsYourUnits: boolean, areMultipleMovablePiecesAllowed: boolean, unmovablePiecesInArea: HousePiece[], movablePiecesInArea: HousePiece[], movablePieces: HousePiece[], setMovablePieces: Dispatch<SetStateAction<HousePiece[]>>, nameOfSelectedPiece: string, setNameOfSelectedPiece: Dispatch<SetStateAction<string>>}) {
    function addMovablePiece() {
        if (!yourHouse) return;

        if (!areMultipleMovablePiecesAllowed) {
            setMovablePieces(movablePieces.filter(movablePiece => movablePiece.area !== name));
        }

        if (movablePieces.some(movablePiece => movablePiece.type === nameOfSelectedPiece)) {
            setMovablePieces(movablePieces.map(movablePiece => movablePiece.type === nameOfSelectedPiece ? {...movablePiece, area: name} : movablePiece))
        } else {
            setMovablePieces([...movablePieces, {house: yourHouse, type: nameOfSelectedPiece, area: name}]);
        }
        setNameOfSelectedPiece("");
    }

    return (
        <div
            className={`area${containsYourUnits ? " contains-your-units" : ""}`}
            style={{top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`}}
            onDragOver={containsYourUnits ? ev => ev.preventDefault() : undefined}
            onDrop={containsYourUnits ?  ev => {
                ev.preventDefault();
                addMovablePiece();
            } : undefined}
            onClick={containsYourUnits ? ev => {
                addMovablePiece();
            } : undefined}
        >
            {unmovablePiecesInArea.map((unmovablePiece, index) => {
                const id = `house-piece-top-${top}-left-${left}-index-${index}`;
                return <Piece key={index} src={`/images/house-pieces/${unmovablePiece.type}-${unmovablePiece.house}.png`} alt={id} />
            })}
            {movablePiecesInArea.map((movablePiece, index) => {
                const nameOfOrderToken = movablePiece.type.slice(12);
                return <MovablePiece key={index} piece={<Piece src={`/images/order-tokens/${["raid-1", "raid-2", "defense-1", "defense-2", "support-1", "support-2", "consolidate-power-1", "consolidate-power-2"].includes(nameOfOrderToken) ? nameOfOrderToken.slice(0, -2) : nameOfOrderToken}.png`} alt={movablePiece.type} />} name={movablePiece.type} nameOfSelectedPiece={nameOfSelectedPiece} setNameOfSelectedPiece={setNameOfSelectedPiece} />
            })}
        </div>
    )
}