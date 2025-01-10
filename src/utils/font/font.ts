import { Geist, Geist_Mono } from "next/font/google";

export const font1 = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const font2 = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const themeToken = {
  // Primary
  colorPrimary: "#8e51bd",

  // Font System
  fontFamily: "inherit",
};
