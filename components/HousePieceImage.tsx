"use client";

import Image from "next/image"

export default function HousePieceImage({id, src, isMovable}: {id: string, src: string, isMovable: boolean}) {
    return (
        <Image
            className="token"
            id={`${id}-token`}
            src={src}
            alt={`${id} token`}
            width={0}
            height={0}
            sizes="3vw"
            draggable={isMovable}
            onDragStart={isMovable ? ev => ev.dataTransfer.setData('text', (ev.target as HTMLImageElement).id) : undefined}
            onClick={isMovable ? ev => {
                ev.stopPropagation();
                for (const token of document.getElementsByClassName('token')) {
                    token.classList.remove('selected');
                }
                (ev.target as HTMLImageElement).classList.add('selected');
            } : undefined}
            loading="eager"
        />
    )
}