import { auth0 } from "@/lib/auth0";
import Image from "next/image";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <>
    <Image
      src="/images/board.jpg"
      alt="The game board should be displaying here..."
      width={1980}
      height={2975}
    />
    <div>
      {session ? `Welcome ${session.user.name}` : "Log in to play"}
    </div>
    </>
  );
}
