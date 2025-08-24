// app/page.js
import Navbar from "@/components/Navbar";
import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Marquee from "@/components/home/Marquee";
import Experience from "@/components/home/Experience";
import Education from "@/components/home/Education";
import Contact from "@/components/home/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Marquee />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
