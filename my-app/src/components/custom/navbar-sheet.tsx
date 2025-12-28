import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Sun } from "lucide-react";
import Link from "next/link";

const navLinks = ["Home", "About", "Contacts", "Show"];

export default function NavSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="outline"> */}
        <Menu className="size-10 text-white" />
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="blueLeather top-24 left-6 max-h-[500px] w-[90%] rounded-2xl border-4 border-blue-900">
        <SheetHeader>
          <SheetTitle>
            <Sun className="size-10 text-white" />
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mx-auto grid w-full grid-cols-1 p-10 text-left">
          {navLinks.map((navLink, index) => (
            <SheetClose asChild key={index}>
              <Link
                className="w-1/2 rounded-md px-3 py-1 text-left text-2xl font-bold text-white transition-colors duration-300 hover:text-neutral-500"
                href={`${navLink.toLowerCase() !== "show" ? "/" : "/show"}`}
              >
                {navLink}
              </Link>
            </SheetClose>
          ))}
        </div>
        {/* <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div> */}
        <SheetFooter className="mx-auto w-1/2">
          <Button type="submit">Sign Out</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
