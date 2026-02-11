"use client";

import { motion } from "framer-motion";
import data from "@/app/api/data/data.json";

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    overflow="visible"
    className="inline-block mx-6">
    <path
      d="M 13.75 28 C 11.9 21.8 6.5 16.5 0 15 L 0 13 C 6.4 11.5 12.1 6 13.75 0 L 15.25 0 C 16.7 6.2 22.9 11.6 28 13 L 28 15 C 22 16.3 16.2 21.9 15.25 28 Z"
      fill="#1f67f1"
    />
  </svg>
);

export default function TextSlider() {
  const items = data.items;

  return (
    <div className="relative w-full overflow-hidden py-10 bg-[var(--custom-white)]">
      <div
        className="absolute left-0 top-0 h-full w-16
        bg-gradient-to-r from-[var(--custom-white)] to-[var(--custom-white)]/0
        pointer-events-none z-10"
      />

      <div
        className="absolute right-0 top-0 h-full w-16 
        bg-gradient-to-l from-[var(--custom-white)] to-[var(--custom-white)]/0
        pointer-events-none z-10"
      />

      <motion.div
        className="flex items-center text-[var(--custom-blue)] uppercase whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 10 }}>
        {[...items, ...items, ...items].map((item, i) => (
          <h1 key={i} className="flex items-center text-9xl font-extrabold">
            {item}
            <Star />
          </h1>
        ))}
      </motion.div>
    </div>
  );
}
