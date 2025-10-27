import { authClient } from "@/lib/auth-client";
import google from "../../../public/search.png";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GoogleSignUp() {
  async function googleOAuthLogin() {
    await authClient.signIn.social({
      provider: "google",
    });
  }
  return (
    <>
      <Button variant={"outline"} onClick={googleOAuthLogin}>
        <Image src={google} alt={"Google logo"} width={20} height={20} />
        <p>Google</p>
      </Button>
    </>
  );
}
