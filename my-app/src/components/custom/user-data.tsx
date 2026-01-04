"use client";
import { useAuthInfo } from "./auth-provider";

export default function UserData() {
  const value = useAuthInfo();

  return value ? (
    <div className="mx-auto mb-5 flex h-auto max-w-2xl flex-col p-5 text-2xl font-bold text-black">
      <p>Display Name: {value?.user?.displayUsername || "Does not exist"}</p>
      <p>User Email: {value?.user.email}</p>
      <p>Name: {value?.user.name}</p>
      <p>UserName: {value?.user.username}</p>
      <p>UserID: {value?.user.id}</p>
    </div>
  ) : null;
}
