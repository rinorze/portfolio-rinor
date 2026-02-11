"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import data from "@/app/api/data/data.json";

export default function Education() {
  const [isHovered, setIsHovered] = useState(false);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();
  if (inView) controls.start("visible");

  const defaultWidth = 100;
  const hoverWidth = 95;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" }
        }
      }}
      className="flex flex-col items-center justify-center gap-8 w-[90%] sm:w-[85%] max-w-[1440px] mx-auto"
      id="education">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="w-full flex items-center gap-4 mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-[var(--custom-blue)] tracking-wide whitespace-nowrap">
              EDUCATION
            </h1>

            <div
              className="relative flex items-center gap-1.5 flex-1 overflow-visible py-2.5 hover:cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <div
                className="relative h-1 rounded-full bg-[#1212121A]"
                style={{
                  width: isHovered ? `${hoverWidth}%` : `${defaultWidth}%`,
                  transition: "width 0.5s ease-out"
                }}
              />
              <motion.svg
                className="w-8 h-8 text-[var(--custom-blue)] absolute right-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 32, opacity: 0 }}
                animate={{
                  x: isHovered ? 0 : 32,
                  opacity: isHovered ? 1 : 0,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-50 gap-y-10 w-full">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className={`flex flex-col gap-3 pb-8 ${
                  edu.school === "Isa Boletini University" ||
                  edu.school === "Tech Lab, Speeex"
                    ? "border-b border-gray-300"
                    : ""
                }, ${
                  edu.school === "Innovation Academy"
                    ? "border-b border-gray-300 sm:border-b-0"
                    : ""
                }`}>
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--custom-blue)] tracking-wide">
                  {edu.school}
                </h2>
                <p className="text-md font-medium text-gray-600">
                  {edu.period}
                </p>
                <ul className="space-y-2 text-[14px] md:text-[18px] text-[#121212]">
                  {edu.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
