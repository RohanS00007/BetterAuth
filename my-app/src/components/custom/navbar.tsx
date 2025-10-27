"use client";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { div } from "motion/react-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div>
      <nav className="mx-auto flex h-20 w-[90%] place-content-center justify-between p-5">
        <div className="flex flex-1 justify-evenly">
          {navLinks.map((navLink, index) => (
            <Link
              className="rounded-md px-2 py-1 hover:bg-neutral-100 hover:ring"
              key={index}
              href={`/`}
            >
              {navLink}
            </Link>
          ))}
        </div>
        <div>
          <Button onClick={signOut}>SignOut</Button>
        </div>
      </nav>
    </div>
  );
}
