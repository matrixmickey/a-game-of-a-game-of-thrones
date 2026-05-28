import { Piece } from "@/types/Piece";
import PieceComponent from "./Piece";
import MovablePiece from "./MovablePiece";
import { Dispatch, SetStateAction } from "react";

export default function RemainingPieces({house, type, name, total, pieces, setSelectedPiece}: {house: string, type: string, name: string, total: number, pieces: Piece[], setSelectedPiece?: Dispatch<SetStateAction<Piece | undefined>>}) {
    return Array.from({length: total - pieces.filter(piece => piece.house === house  && piece.type === type && piece.name === name).length}, (_, index) => setSelectedPiece
        ?
            <MovablePiece key={index} pieceComponent={<PieceComponent src={`/images/pieces/${type}/${name}${type !== "order" ? `/${house}` : ""}.png`} alt={`${name} ${house}`} />} piece={{house, type, name, area: ""} } setSelectedPiece={setSelectedPiece} />
        :
            <PieceComponent key={index} src={`/images/pieces/${type}/${name}${type !== "order" ? `/${house}` : ""}.png`} alt={`${name} ${house}`} />
    );
}