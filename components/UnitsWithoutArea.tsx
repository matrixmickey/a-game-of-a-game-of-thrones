import { HousePiece } from "@/types/HousePiece";
import HousePieceImage from "./HousePieceImage";

export default function UnitsWithoutArea({type, house, total, housePieces}: {type: string, house: string, total: number, housePieces: HousePiece[]}) {
    return Array.from({length: total - housePieces.filter(housePiece => housePiece.house === house && housePiece.type === type).length}, (_, index) => (
        <HousePieceImage key={index} id={`house-piece-${type}-index-${index}`} src={`/images/house-pieces/units/${type}-${house}.png`} />
    ))
}