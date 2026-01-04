"use client";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavSheet from "./navbar-sheet";

import { motion } from "motion/react";

import { useAuthInfo } from "./auth-provider";

// Create a motion-wrapped version of our custom Button component
const MotionButton = motion(Button);

export default function Navbar() {
  const navLinks = ["Home", "About", "Contacts"];
  const router = useRouter();

  const value = useAuthInfo();

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
    <nav className="blueDot mx-auto mt-2 flex h-20 w-[90%] place-content-center justify-between rounded-2xl p-4 shadow-md/20 sm:mx-auto">
      <div>
        <ul className="mx-auto hidden flex-1 justify-evenly md:block">
          {navLinks.map((navLink, index) => (
            <Link
              className="mx-6 rounded-md p-0 px-2 py-1 text-2xl text-white hover:ring"
              key={index}
              href={`/`}
            >
              {navLink}
            </Link>
          ))}
        </ul>
        <div className="w-full md:hidden">
          <NavSheet />
        </div>
      </div>

      <div className="flex w-50 justify-evenly">
        {/* Use motion(Button) to animate our custom Button */}
        {/** Create a MotionButton by wrapping the Button component with motion */}
        {!value ? (
          <Link href={"/sign-up"}>
            <Button className="cursor-pointer">SignUp</Button>
          </Link>
        ) : (
          <MotionButton
            className="cursor-pointer"
            onClick={signOut}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
          >
            SignOut
          </MotionButton>
        )}
      </div>
    </nav>

    // </div>
  );
}
