"use client";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export function TextAnimation({
  text = "",
  duration = 0.3,
  delayMultiple = 0.04,
  initialDelay = 0,
  animKey = 0,  // ← add this prop
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className = "",
}) {
  return (
    <div className="flex space-x-1">
      <AnimatePresence mode="wait">
        {text.split("").map((char, i) => (
          <motion.h1
            key={`${animKey}-${i}`}  // ← use animKey + index, never char
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: initialDelay + i * delayMultiple }}
            className={cn("tracking-tight", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}