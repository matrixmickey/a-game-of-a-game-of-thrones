import { HousePiece } from "@/types/HousePiece";
import Piece from "./Piece";

export default function RemainingUnits({type, house, total, housePieces}: {type: string, house: string, total: number, housePieces: HousePiece[]}) {
    return Array.from({length: total - housePieces.filter(housePiece => housePiece.house === house && housePiece.type === type).length}, (_, index) => (
        <Piece key={index} src={`/images/house-pieces/${type}-${house}.png`} alt={`${type} ${house}`} />
    ));
}