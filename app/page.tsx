import Area from "@/components/Area";
import { auth0 } from "@/lib/auth0";
import Image from "next/image";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <>
    <div className="board-container">
      <Image
        src="/images/board.jpg"
        alt="The game board should be displaying here..."
        width={1980}
        height={2975}
      />
      <Area top={0} left={0} width={10} height={35} />
      <Area top={37} left={0} width={3} height={32} />
      <Area top={95} left={15} width={20} height={5} />
    </div>
    <div>
      {session ? `Welcome ${session.user.name}` : "Log in to play"}
    </div>
    </>
  );
}
