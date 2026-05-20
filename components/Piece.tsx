import Image from "next/image";

export default function Piece({src, alt, className}: {src: string, alt: string, className?: string}) {
    return (
        <Image
            src={src}
            alt={`${alt} piece`}
            width={0}
            height={0}
            sizes="3vw"
            className={"piece" + (className ? ` ${className}` : "")}
            loading="eager"
        />
    );
}