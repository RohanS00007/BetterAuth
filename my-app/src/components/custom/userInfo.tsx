"use client";
import { authClient } from "@/lib/auth-client";
import StopImpersonationBtn from "./stopImpersonation";
// import github from '../../../public/github-logo.png';

import Image from "next/image";

export default function UserInfo() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mx-auto flex w-3xl justify-between rounded-lg p-5 shadow-md/10">
      {session.user.image && (
        <Image
          className="mr-3 size-25 rounded-full border-2"
          src={session?.user?.image as string}
          width={50}
          height={50}
          alt="image"
        ></Image>
      )}
      <div className="mx-auto w-2xl">
        <h1 className="text-3xl text-blue-500">Welcome {session.user.name}</h1>
        <h1 className="text-xl text-purple-400">
          You signed up with {session.user.email}
        </h1>
      </div>
      <div className="mx-auto mt-2 flex max-w-[250px] place-content-center">
        {session.session?.impersonatedBy && <StopImpersonationBtn />}
      </div>
    </div>
  );
}
