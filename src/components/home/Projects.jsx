"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

import data from "@/app/api/data/data.json";
import evoschool from "@/images/evoschool.png";
import jobportal from "@/images/jobportal.png";
import runok from "@/images/runok.png";
import unfinityplus from "@/images/unfinityplus.png";
import travelapp from "@/images/travel-app.png";

const images = {
  evoschool,
  jobportal,
  runok,
  unfinityplus,
  travelapp
};

export default function Projects() {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);
  const [previewTop, setPreviewTop] = useState(0);
  const [isBarHover, setIsBarHover] = useState(false);

  const projects = data.projects;

  const [isHovered, setIsHovered] = useState(false);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  if (inView) {
    controls.start("visible");
  }

  const defaultWidth = 100;
  const hoverWidth = 95;

  const handleEnter = (e, index) => {
    if (window.innerWidth < 1024) return;

    const row = e.currentTarget;
    const rowTop = row.offsetTop;
    const rowHeight = row.offsetHeight;
    const previewHeight = 180;
    const top = rowTop + rowHeight / 2 - previewHeight / 2;

    setHovered(index);
    setPreviewTop(top);
  };

  const handleLeave = () => setHovered(null);

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
      className="flex flex-col items-center justify-center gap-4 w-[90%] sm:w-[85%] max-w-[1440px] mx-auto my-16 md:my-[100px] lg:my-[150px]"
      id="projects">
      <div className="w-full flex  items-center gap-4 mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] tracking-wide whitespace-nowrap">
          PROJECTS
        </h1>

        <div
          className="relative flex items-center gap-1.5 flex-1 w-full sm:w-auto overflow-visible py-2.5 hover:cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => router.push("/about")}>
          <div
            className="relative h-1 rounded-full bg-[#1212121A] dark:bg-[#F0F0F01A] w-full"
            style={{
              width: isHovered ? `${hoverWidth}%` : `${defaultWidth}%`,
              transition: "width 0.5s ease-out"
            }}></div>

          <motion.svg
            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] absolute right-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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

      <div
        className="w-full relative flex flex-col divide-y divide-gray-300 dark:divide-gray-700"
        onMouseLeave={handleLeave}>
        {projects.map((project, index) => (
          <div
            key={index}
            className={`group flex  md:items-center justify-between py-6 md:py-8 lg:py-10 cursor-pointer ${
              index === projects.length - 1
                ? "border-b border-gray-300 dark:border-gray-700"
                : ""
            }`}
            onMouseEnter={(e) => handleEnter(e, index)}
            onClick={() => router.push(project.link)}>
            <p
              className="font-sans text-xl md:text-2xl font-semibold transition-colors duration-300 
                group-hover:text-[var(--custom-blue)] 
                dark:group-hover:text-[var(--custom-yellow)]
                mb-2 md:mb-0">
              {project.title}
            </p>

            <div className="flex  md:items-center gap-2 md:gap-6 text-gray-500 md:min-w-[250px] justify-between">
              <p className="text-sm md:text-md font-medium hidden md:block">
                {project.date}
              </p>
              <p className="text-md md:text-lg text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] font-semibold tracking-wide">
                {project.category}
              </p>
            </div>
          </div>
        ))}

        {hovered !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, top: previewTop }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden lg:block absolute right-0 w-[250px] lg:w-[300px] h-[150px] lg:h-[180px] rounded-lg shadow-lg z-10 overflow-hidden pointer-events-none"
            style={{ top: previewTop }}>
            <Image
              src={images[projects[hovered].image]}
              alt={projects[hovered].title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
