"use client";

import Image from "next/image"

export default function Token({id, src}: {id: string, src: string}) {
    return (
        <Image
            className="token"
            id={`${id}-token`}
            src={src}
            alt={`${id} token`}
            width={64}
            height={64}
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