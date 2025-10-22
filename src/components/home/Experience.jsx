"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

import data from "@/app/api/data/data.json";

function Counter({ to, suffix = "+", duration = 2, compact = false }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v)
    });
    return () => controls.stop();
  }, [to, duration, inView]);

  const rounded = Math.round(val);
  const formatted = compact
    ? new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 0
      }).format(rounded)
    : rounded;

  return (
    <span
      ref={ref}
      className="text-6xl md:text-7xl font-extrabold tracking-wide text-[var(--custom-blue)] dark:text-[var(--custom-yellow)]">
      {formatted}
      {suffix}
    </span>
  );
}

export default function Experience() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

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
      className="flex flex-col items-center justify-center gap-8 w-[90%] sm:w-[85%] max-w-[1440px] mx-auto my-[150px]"
      id="experience">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="w-full flex items-center gap-4 mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] tracking-wide whitespace-nowrap">
              EXPERIENCE
            </h1>

            <div
              className="relative flex items-center gap-1.5 flex-1 overflow-visible py-2.5 hover:cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <div
                className="relative h-1 rounded-full bg-[#1212121A] dark:bg-[#F0F0F01A]"
                style={{
                  width: isHovered ? `${hoverWidth}%` : `${defaultWidth}%`,
                  transition: "width 0.5s ease-out"
                }}
              />
              <motion.svg
                className="w-8 h-8 text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] absolute right-0"
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

          <div className="flex flex-col w-full">
            {data.experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex flex-col gap-3 py-6 ${
                  index < 2
                    ? "border-b border-gray-300 dark:border-gray-700"
                    : ""
                }`}>
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--custom-blue)] dark:text-[var(--custom-yellow)]">
                  {exp.role} — {exp.company}
                </h2>
                <p className="text-md font-medium text-gray-600 dark:text-gray-400">
                  {exp.period}
                </p>
                <ul className="list-disc list-inside space-y-2 text-[14px] md:text-[18px] text-[#121212] dark:text-[#F0F0F0]">
                  {exp.responsibilities.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:divide-x divide-[#1212121A] dark:divide-[#F0F0F01A] md:mt-10 ">
            <div className="flex flex-col items-center px-4 md:px-8">
              <Counter to={10} suffix="+" />
              <p className="text-2xl text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] text-center mt-2">
                Projects Completed
              </p>
            </div>

            <div className="flex flex-col items-center px-4 md:px-8 py-4 md:py-0">
              <Counter to={50} suffix="+" compact />
              <p className="text-2xl text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] text-center mt-2">
                Satisfied Clients
              </p>
            </div>

            <div className="flex flex-col items-center px-4 md:px-8 py-4 md:py-0">
              <Counter to={100} suffix="+" />
              <p className="text-2xl text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] text-center mt-2">
                Positive Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
