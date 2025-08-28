"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { X } from "lucide-react";
import logoLight from "../images/rinor-light-removebg.png";
import logoDark from "../images/rinor-dark-removebg.png";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const menuItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "projects", label: "PROJECTS" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "education", label: "EDUCATION" },
    { id: "contact", label: "CONTACT" }
  ];

  useEffect(() => {
    const sections = menuItems.map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => section && observer.observe(section));

    return () => {
      sections.forEach((section) => section && observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <header className="w-full fixed top-0 z-50 bg-[var(--custom-white)] dark:bg-[var(--custom-black)] ">
        <div className="flex items-center justify-between mx-auto w-[90%] sm:w-[85%] xl:max-w-[1440px] py-8">
          <div className="relative flex-1">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[var(--custom-black)] dark:text-[var(--custom-white)] focus:outline-none hover:cursor-pointer">
              {menuOpen ? (
                <X size={28} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-7">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              )}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ clipPath: "circle(0% at 0% 0%)" }}
                  animate={{ clipPath: "circle(150% at 0% 0%)" }}
                  exit={{ clipPath: "circle(0% at 0% 0%)" }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute top-10 left-0 rounded-xl rounded-bl-none overflow-hidden bg-[var(--custom-white)] dark:bg-[var(--custom-black)]">
                  <div className="p-5 pl-0 w-56">
                    <ul className="flex flex-col gap-3 text-base font-semibold">
                      {menuItems.map((item) => (
                        <li key={item.id}>
                          <ScrollLink
                            to={item.id}
                            smooth={true}
                            duration={500}
                            offset={-170}
                            className={`${
                              activeSection === item.id
                                ? "text-[var(--custom-blue)] dark:text-[var(--custom-yellow)]"
                                : "text-[var(--custom-black)] hover:text-[var(--custom-blue)] dark:text-[var(--custom-white)] dark:hover:text-[var(--custom-yellow)] transition-colors duration-300"
                            }`}
                            onClick={() => setMenuOpen(false)}>
                            <h1 className="text-3xl tracking-wider hover:cursor-pointer">
                              {item.label}
                            </h1>
                          </ScrollLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="/"
            className="flex items-center absolute left-1/2 transform -translate-x-1/2">
            {mounted && (
              <Image
                src={theme === "dark" ? logoDark : logoLight}
                alt="Logo"
                width={150}
                height={50}
                priority
              />
            )}
          </a>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block px-5 py-3 rounded-full bg-[var(--custom-black)] hover:bg-[var(--custom-blue)] text-[var(--custom-white)] hover:text-[var(--custom-white)] dark:bg-[var(--custom-white)] dark:hover:bg-[var(--custom-yellow)] dark:text-[var(--custom-black)] dark:hover:text-[var(--custom-black)]  transition-colors duration-300 ease-in-out">
              My Resume
            </a>
          </div>
        </div>
      </header>

      <div className="h-18"></div>
    </>
  );
}
