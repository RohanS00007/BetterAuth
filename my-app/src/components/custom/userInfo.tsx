"use client";
import { authClient } from "@/lib/auth-client";
import StopImpersonationBtn from "./stopImpersonation";
import { useContext } from "react";
import { AuthContext } from "./auth-provider";

import Image from "next/image";

export default function UserInfo() {
  const value = useContext(AuthContext);

  if (!value) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mx-auto h-min w-sm flex-col justify-between rounded-lg border-4 bg-none p-5 shadow-md/10 sm:w-xl md:w-2xl lg:w-3xl">
      {value?.user?.image && (
        <Image
          className="mr-3 size-25 rounded-full border-2"
          src={value?.user.image as string}
          width={50}
          height={50}
          alt="image"
        ></Image>
      )}
      <div className="mx-auto w-2xl">
        <h1 className="text-xl text-blue-500 md:text-3xl">
          Welcome {value.user.name}
        </h1>
        <h1 className="text-sm text-purple-400 md:text-lg">
          You signed up with {value.user.email}
        </h1>
      </div>
      <div className="mx-auto mt-2 flex max-w-[250px] place-content-center">
        {value?.session.impersonatedBy && <StopImpersonationBtn />}
      </div>
    </div>
  );
}
