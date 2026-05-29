import { Piece } from "@/types/Piece";
import PieceComponent from "./Piece";

export default function RemainingPieces({house, type, name, total, pieces}: {house: string, type: string, name: string, total: number, pieces: Piece[]}) {
    return Array.from({length: total - pieces.filter(piece => piece.house === house  && piece.type === type && piece.name === name).length}, (_, index) => <PieceComponent key={index} src={`/images/pieces/${type}/${name}${type !== "order" ? `/${house}` : ""}.png`} alt={`${name} ${house}`} />);
}