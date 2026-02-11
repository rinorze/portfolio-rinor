"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  if (inView) {
    controls.start("visible");
  }

  const defaultWidth = 100;
  const hoverWidth = 95;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully ✅");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send ❌");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send ❌");
    }
  };

  return (
    <motion.div
      id="contact"
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
      className="flex flex-col items-center justify-center gap-4 w-[90%] sm:w-[85%] max-w-[1440px] mx-auto mt-[50px] mb-[150px]">
      <div className="w-full mt-20">
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          <div className="w-full flex items-center gap-4 mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-[var(--custom-blue)] tracking-wide whitespace-nowrap">
              CONTACT
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
                }}></div>

              <motion.svg
                className="w-8 h-8 text-[var(--custom-blue)] absolute right-0"
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
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-30">
        <div className="flex-1">
          <p className="text-[var(--custom-black)] mb-6 text-lg lg:text-2xl">
            Looking to start a project or you need consultation? Feel free to
            contact me.
          </p>
          <p className="text-[var(--custom-black)] text-lg lg:text-xl">
            Vushtrri, Kosovo
          </p>

          <a
            href="mailto:rzeqiri03@gmail.com"
            className="block w-fit text-lg lg:text-xl text-[var(--custom-blue)] hover:underline cursor-pointer">
            rzeqiri03@gmail.com
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2 flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[var(--custom-black)]">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-md bg-[#1212121A] text-[var(--custom-black)] focus:outline-none focus:ring-2 focus:ring-[var(--custom-blue)]"
                required
              />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-[var(--custom-black)]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. john@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-md bg-[#1212121A] text-[var(--custom-black)] focus:outline-none focus:ring-2 focus:ring-[var(--custom-blue)]"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-[var(--custom-black)]">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or idea..."
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-md bg-[#1212121A] text-[var(--custom-black)] min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[var(--custom-blue)]"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--custom-blue)] hover:bg-[var(--custom-black)] text-[var(--custom-white)] transition-colors duration-300 ease-in-out font-medium py-3 rounded-md cursor-pointer">
            Send Message
          </button>
          {status && <p className="text-sm text-gray-600">{status}</p>}
        </form>
      </div>
    </motion.div>
  );
}
