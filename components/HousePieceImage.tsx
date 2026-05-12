"use client";

import Image from "next/image"

export default function HousePieceImage({id, src}: {id: string, src: string}) {
    return (
        <Image
            className="token"
            id={`${id}-token`}
            src={src}
            alt={`${id} token`}
            width={0}
            height={0}
            sizes="3vw"
            onDragStart={ev => ev.dataTransfer.setData('text', (ev.target as HTMLImageElement).id)}
            onClick={ev => {
                ev.stopPropagation();
                for (const token of document.getElementsByClassName('token')) {
                    token.classList.remove('selected');
                }
                (ev.target as HTMLImageElement).classList.add('selected');
            }}
        />
    )
}