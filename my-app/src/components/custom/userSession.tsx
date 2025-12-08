import Image from "next/image";
import StopImpersonationBtn from "./stopImpersonation";
import type { Session } from "@/lib/auth";

export default function UserSession({ userData }: { userData: Session }) {
  return (
    <div className="mx-auto flex w-3xl justify-between rounded-lg border-4 bg-none p-5 bg-blend-difference shadow-md/10">
      {userData?.user.image && (
        <Image
          className="mr-3 size-25 rounded-full border-2"
          src={userData?.user?.image as string}
          width={50}
          height={50}
          alt="image"
        ></Image>
      )}
      <div className="mx-auto w-2xl">
        <h1 className="text-3xl text-blue-500">
          Welcome {userData?.user.name}
        </h1>
        <h1 className="text-xl text-purple-400">
          You signed up with {userData?.user.email}
        </h1>
      </div>
      <div className="mx-auto mt-2 flex max-w-[250px] place-content-center">
        {userData?.session?.impersonatedBy && <StopImpersonationBtn />}
      </div>
    </div>
  );
}
