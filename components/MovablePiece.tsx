"use client";

export default function MovablePiece({piece, id}: {piece: React.ReactNode, id: string}) {
    return (
        <div
            id={`${id}-piece`}
            onDragStart={ev => ev.dataTransfer.setData('text', (ev.currentTarget as HTMLImageElement).id)}
            onClick={ev => {
                ev.stopPropagation();
                for (const movablePiece of document.getElementsByClassName('movable-piece')) {
                    movablePiece.classList.remove('selected');
                }
                (ev.currentTarget as HTMLImageElement).classList.add('selected');
            }}
            className="movable-piece"
        >
            {piece}
        </div>
    )
}