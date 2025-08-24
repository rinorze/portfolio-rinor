import { DM_Sans, Big_Shoulders } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

import Navbar from "@/components/Navbar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata = {
  title: "Rinor - Personal Portfolio",
  description: "Personal portfolio of Rinor, showcasing projects and skills."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${bigShoulders.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
