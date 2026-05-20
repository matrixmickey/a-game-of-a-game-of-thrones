import { HousePiece } from "@/types/HousePiece";
import MovablePiece from "./MovablePiece";
import Piece from "./Piece";

export default function RemainingUnits({type, house, total, housePieces}: {type: string, house: string, total: number, housePieces: HousePiece[]}) {
    return Array.from({length: total - housePieces.filter(housePiece => housePiece.house === house && housePiece.type === type).length}, (_, index) => {
        const id = `unit-${type}-index-${index}`;
        return (
            <MovablePiece key={index} piece={<Piece src={`/images/house-pieces/units/${type}-${house}.png`} alt={id} />} id={id} />
        );
    })
}