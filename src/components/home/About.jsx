"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";

import rinor from "@/images/rinor.jpg";

export default function About() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  if (inView) {
    controls.start("visible");
  }

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
      className="flex flex-col items-center justify-center gap-4 w-[90%] sm:w-[85%] max-w-[1440px] mx-auto my-[150px]"
      id="about">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="w-full flex items-center gap-4 mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] tracking-wide whitespace-nowrap">
              ABOUT
            </h1>

            <div
              className="relative flex items-center gap-1.5 flex-1 overflow-visible py-2.5 hover:cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => router.push("/about")}>
              <div
                className="relative h-1 rounded-full bg-[#1212121A] dark:bg-[#F0F0F01A]"
                style={{
                  width: isHovered ? `${hoverWidth}%` : `${defaultWidth}%`,
                  transition: "width 0.5s ease-out"
                }}></div>

              <motion.svg
                className="w-8 h-8 text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] absolute right-0"
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
          <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between gap-20 w-full">
            <div className="w-full lg:w-1/2">
              <p className="text-[18px] md:text-[22px] text-[#121212] dark:text-[#F0F0F0] mb-4">
                Passionate about creativity and problem-solving, I enjoy turning
                ideas into impactful digital solutions. Currently pursuing
                studies at IBCM University, I am expanding my knowledge in both
                technology and business while gaining hands-on experience in the
                industry.
              </p>
              <p className="text-[18px] md:text-[22px] text-[#121212] dark:text-[#F0F0F0] mb-4">
                My professional journey began with an internship at Creative
                Deer, where I had the opportunity to grow, learn, and contribute
                to real projects. That experience led me to continue working
                with the same team, where I now focus on creating meaningful and
                engaging digital experiences.
              </p>
            </div>

            <div className="relative flex justify-center">
              <Image
                src={rinor}
                alt="Rinor Zeqiri"
                className="w-80 md:w-110 rounded-b-full object-cover"
              />

              <div className="absolute bg-[#12121281] dark:bg-[#f0f0f07a] bottom-[0px] right-[0px] md:right-[-20px] w-34 h-auto rounded-full flex items-center justify-center cursor-pointer group">
                <svg
                  className="w-full h-full animate-spin-slow p-1"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100
              m -75, 0
              a 75,75 0 1,1 150,0
              a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text
                    fill="currentColor"
                    className="text-[28px] font-semibold tracking-wide text-[var(--custom-white)] dark:text-[var(--custom-black)]">
                    <textPath xlinkHref="#circlePath" startOffset="1%">
                      • LET'S TALK • LET'S TALK • LET'S TALK • LET'S TALK
                    </textPath>
                  </text>
                </svg>

                <div className="absolute flex items-center justify-center">
                  <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={500}
                    offset={-150}
                    className="px-7 py-[22.5px] text-2xl hover:rotate-[-45deg] transition-transform duration-300 bg-[var(--custom-black)] dark:bg-[var(--custom-white)] text-[var(--custom-white)] dark:text-[var(--custom-black)] rounded-full cursor-pointer">
                    ↓
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
