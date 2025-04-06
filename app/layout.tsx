import type { Metadata } from "next";
import {
  Alumni_Sans_Pinstripe,
  New_Rocker,
  Montserrat,
} from "next/font/google";
import "./globals.css";

// Importing Google Fonts using next/font
const alumniSansPinstripe = Alumni_Sans_Pinstripe({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sub",
});

const newRocker = New_Rocker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-name",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Vedant",
  description: "Peace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newRocker.variable} ${alumniSansPinstripe.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
