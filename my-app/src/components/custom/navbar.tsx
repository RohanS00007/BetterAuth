"use client";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { div } from "motion/react-client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { motion } from "motion/react";

// import { Session } from "better-auth";

export default function Navbar() {
  const navLinks = ["Home", "About", "Contacts", "Portfolio", "Services"];
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  }
  return (
    <div className="w-full">
      <nav className="blueBox mx-auto mt-2 flex h-20 w-[90%] place-content-center justify-between rounded-2xl p-4 shadow-md/20">
        <div className="flex flex-1 justify-evenly">
          {navLinks.map((navLink, index) => (
            <Link
              className="rounded-md p-0 px-2 py-1 text-2xl text-white hover:ring"
              key={index}
              href={`/`}
            >
              {navLink}
            </Link>
          ))}
        </div>
        <div className="flex w-50 justify-evenly">
          <Button className="cursor-pointer" onClick={signOut}>
            SignOut
          </Button>
          <Link href={"/sign-up"}>
            <Button className="cursor-pointer">SignUp</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
