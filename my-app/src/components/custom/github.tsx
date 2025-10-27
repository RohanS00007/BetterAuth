import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import github from "../../../public/github-logo.png";
import Image from "next/image";

export default function GitHubSignUp() {
  async function gitHubOAuthSignIn() {
    await authClient.signIn.social({
      provider: "github",
    });
  }
  return (
    <>
      <Button
        onClick={gitHubOAuthSignIn}
        className="flex flex-row"
        variant={"outline"}
      >
        <Image src={github} alt="Github logo" width={20} height={20} />
        <p>Github</p>
      </Button>
    </>
  );
}
