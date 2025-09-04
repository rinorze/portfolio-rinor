"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const words = "CRAFTING DIGITAL GOODS SINCE — Y:2022".split(" ");
  const rinorChars = "RINOR".split("");

  return (
    <div
      id="home"
      className="flex flex-col items-center justify-center gap-4 w-[90%] sm:w-[85%] xl:max-w-[1440px] mx-auto mb-[50px]">
      <motion.p
        className="text-[12px] md:text-sm text-gray-900/50 dark:text-gray-400/50 font-medium tracking-wide leading-none flex gap-1 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0 + 0.3 }}>
            {word}
          </motion.span>
        ))}
      </motion.p>
      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        <motion.h1
          className="text-[140px] md:text-[220px] font-black tracking-wide text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] leading-30 md:leading-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          {rinorChars.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 + 0.3 }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h1
          className="text-[140px] md:text-[220px] font-black tracking-wide text-[var(--custom-blue)] dark:text-[var(--custom-yellow)] leading-20 md:leading-30 mt-4"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}>
          ZEQIRI
        </motion.h1>
      </div>
      <motion.div
        className="flex gap-4 my-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="none"
          overflow="visible"
          className="hidden dark:block">
          {" "}
          <path
            d="M 22.75 48 C 20.903 37.41 10.483 27.457 0 25.25 L 0 22.625 C 10.549 20.105 20.686 10.941 22.75 0 L 25.375 0 C 27.169 10.66 37.542 20.343 48 22.625 L 48 25.25 C 37.735 27.377 27.106 37.364 25.375 48 Z"
            fill="rgb(224, 241, 31)"
          />{" "}
        </svg>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="none"
          overflow="visible"
          className="block dark:hidden">
          {" "}
          <path
            d="M 22.75 48 C 20.903 37.41 10.483 27.457 0 25.25 L 0 22.625 C 10.549 20.105 20.686 10.941 22.75 0 L 25.375 0 C 27.169 10.66 37.542 20.343 48 22.625 L 48 25.25 C 37.735 27.377 27.106 37.364 25.375 48 Z"
            fill="rgb(31, 103, 241)"
          />{" "}
        </svg>{" "}
      </motion.div>{" "}
      <motion.p
        className="text-[18px] md:text-[22px] text-[#121212] dark:text-[#F0F0F0] w-full sm:w-[70%] md:w-[50%] text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}>
        {" "}
        I’m Rinor Zeqiri — a software developer passionately creating digital
        experiences and solutions for over 3 years{" "}
      </motion.p>
    </div>
  );
}
