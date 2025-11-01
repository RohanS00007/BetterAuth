import Image from "next/image";
import notionImg from "../../../public/notion.avif";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <div
      className={cn(
        "mx-auto flex h-[500px] max-w-3xl flex-col place-content-center items-center",
      )}
    >
      {/* Hero Section Image */}
      <div>
        <Image src={notionImg} height={400} width={700} alt="doddles"></Image>
      </div>
      {/* Hero Section Heading */}
      <div>
        <h1 className="mt-3 bg-linear-to-br from-red-400 via-yellow-400 to-orange-300 bg-clip-text pb-3 text-center font-bold tracking-tighter text-transparent sm:text-5xl md:text-7xl dark:text-blue-500">
          Your teams, tools, agents. Together.
        </h1>
      </div>
      {/* Hero Section paragraph */}
      <div>
        <p className="mt-3 mb-2 w-[500px] text-center text-xl font-semibold text-white">
          One AI workspace where teams find every answer, automate the busywork,
          and get projects done.
        </p>
      </div>
      {/* Hero Section Buttons */}
      <div className="flex w-[20rem] justify-between p-2">
        <button className="text-md cursor-pointer rounded-sm bg-blue-600 px-3 py-2 font-semibold text-white hover:bg-blue-500">
          Get Notion Free
        </button>
        <button className="cursor-pointer rounded-sm bg-blue-200 px-3 py-2 font-bold text-blue-500 hover:bg-blue-300">
          Request a demo
        </button>
      </div>
    </div>
  );
}
