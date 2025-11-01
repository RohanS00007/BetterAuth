"use client";
import HeroSection from "@/components/custom/notionHero";
// import ScrollComponent from "@/components/custom/scrollComp";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export default function Show() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backgroundPosition = useTransform(scrollYProgress, [0, 1], [15, 2000]);
  return (
    <div ref={ref}>
      <motion.div
        // whileHover={{
        //   backgroundPosition: useMotionTemplate`${backgroundPosition}px`
        // }}
        style={{
          backgroundPosition: useMotionTemplate`${backgroundPosition}px, 0%`,
        }}
        // initial={{
        //   backgroundPosition: "15px",
        // }}
        // animate={{
        //   backgroundPosition: "700px",
        // }}
        // transition={{
        //   duration: 3,
        //   ease: "easeInOut",
        //   // animationIterationCount: infinite,
        // }}
        className="blueBox mx-auto mt-10 max-w-sm overflow-hidden rounded-lg border-none mask-alpha shadow-xs md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
      >
        <HeroSection />
      </motion.div>
      <div className="mx-auto mt-30 h-200 w-100 bg-white"></div>
      {/* <ScrollComponent /> */}
      {/* <div className="h-299"></div> */}
    </div>
  );
}
