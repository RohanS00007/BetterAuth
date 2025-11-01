"use client";
import { motion } from "motion/react";

export default function Motion() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
      }}
      //   initial={false}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        // transition: { duration: 1.5, ease: "easeOut" },
      }}
      whileHover={{
        scale: 1.05,
        cursor: "pointer",
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="size-90 rounded-md bg-neutral-500 shadow-md/30"
    >
      <div className="p-4 text-white">
        <h2 className="mb-2 text-xl font-bold">Motion Component</h2>
        <p>This component uses motion for smooth animations on hover.</p>
      </div>
    </motion.div>
  );
}
