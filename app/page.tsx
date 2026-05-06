import Image from "next/image";

export default function Home() {
  return (
    <Image
      src="/images/board.jpg"
      alt="The game board should be displaying here..."
      width={1980}
      height={2975}
    />
  );
}
