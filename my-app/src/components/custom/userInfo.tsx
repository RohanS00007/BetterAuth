"use client";
import { authClient } from "@/lib/auth-client";
import StopImpersonationBtn from "./stopImpersonation";
// import github from '../../../public/github-logo.png';

// import Image from "next/image";

export default function UserInfo() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="mx-auto w-2xl rounded-lg p-5 shadow-md/30">
        <h1 className="text-3xl text-blue-500">Welcome {session.user.name}</h1>
        <h1 className="text-xl text-purple-400">
          You signed up with {session.user.email}
        </h1>
        {session.session?.impersonatedBy && <StopImpersonationBtn />}
      </div>
    </div>
  );
}
