import Area from "@/components/Area";
import Token from "@/components/Token";
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
      {session ? 
      <>
      <Token id="raid-special" src="/images/tokens/orders/RaidSpecial.png" />
      <Token id="raid-1" src="/images/tokens/orders/Raid.png" />
      <Token id="raid-2" src="/images/tokens/orders/Raid.png" />
      <Token id="march-special" src="/images/tokens/orders/MarchSpecial.png" />
      <Token id="march" src="/images/tokens/orders/March.png" />
      <Token id="march-minus-one" src="/images/tokens/orders/MarchMinusOne.png" />
      <Token id="defense-special" src="/images/tokens/orders/DefenseSpecial.png" />
      <Token id="defense-1" src="/images/tokens/orders/Defense.png" />
      <Token id="defense-2" src="/images/tokens/orders/Defense.png" />
      <Token id="support-special" src="/images/tokens/orders/SupportSpecial.png" />
      <Token id="support-1" src="/images/tokens/orders/Support.png" />
      <Token id="support-2" src="/images/tokens/orders/Support.png" />
      <Token id="consolidate-power-special" src="/images/tokens/orders/ConsolidatePowerSpecial.png" />
      <Token id="consolidate-power-1" src="/images/tokens/orders/ConsolidatePower.png" />
      <Token id="consolidate-power-2" src="/images/tokens/orders/ConsolidatePower.png" />
      </>
      : "Log in to play"}
    </div>
    </>
  );
}
