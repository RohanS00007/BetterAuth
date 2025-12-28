import UserInfo from "@/components/custom/userInfo";

export default function Home() {
  return (
    <div className="flex max-h-screen min-h-[calc(100vh-80px)] w-full place-content-center place-items-center">
      <UserInfo />
    </div>
  );
}
