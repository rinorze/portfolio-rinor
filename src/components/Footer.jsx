"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();

  const socials = [
    { id: "gh", label: "GH", href: "https://github.com/rinorze" },
    { id: "wh", label: "WH", href: "whatsapp://send?phone=38345964715" },
    {
      id: "ln",
      label: "LN",
      href: "https://www.linkedin.com/in/rinor-zeqiri-a65432270/"
    }
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[var(--custom-white)] dark:bg-[var(--custom-black)]">
      <div className="flex items-center justify-center py-4 md:py-6 lg:py-8 gap-6 sm:gap-10 md:gap-0">
        {socials.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <h1 className="text-[100px] sm:text-[140px] md:text-[180px] lg:text-[250px] xl:text-[350px] font-extrabold leading-[0.8] md:leading-[0.7] lg:leading-[0.6] translate-y-1/4 md:translate-y-1/3">
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  transition-colors duration-300
                  ${
                    theme === "dark"
                      ? "text-[var(--custom-yellow)] hover:text-[var(--custom-white)]"
                      : "text-[var(--custom-blue)] hover:text-[var(--custom-black)]"
                  }
                `}>
                {item.label}
              </Link>
            </h1>

            {index < socials.length - 1 && (
              <div className="hidden md:block translate-y-[40%] lg:translate-y-[60%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="56"
                  height="56"
                  fill="none"
                  overflow="visible"
                  className="inline-block mx-3 md:mx-4 lg:mx-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14">
                  <path
                    d="M 26.542 56 C 24.387 43.645 12.23 32.033 0 29.458 L 0 26.396 C 12.307 23.456 24.134 12.764 26.542 0 L 29.604 0 C 31.697 12.437 43.799 23.733 56 26.396 L 56 29.458 C 44.024 31.94 31.624 43.591 29.604 56 Z"
                    fill={theme === "dark" ? "#f0f0f0" : "#121212"}></path>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
