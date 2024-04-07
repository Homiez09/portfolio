import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Webring } from "@/components/Webring";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Phumrapee Soenvanichakul',
  description: `I'm Phumrapee Soenvanichakul | ภูมิระพี เสริญวณิชกุล (GH: HomieZ09) This is my portfolio website. 
  I'm a student at Kasetsart University, majoring in Computer Science.
  I'm interested in web-app development, game development, and data science.`,
  images: [
    {
      url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
      width: 800,
      height: 600,
    },
    {
      url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
      width: 1800,
      height: 1600,
      alt: 'Phumrapee Soenvanichakul (HomieZ09)',
    },
  ],
  openGraph: {
    title: 'Phumrapee Soenvanichakul',
    description: `
    I'm Phumrapee Soenvanichakul | ภูมิระพี เสริญวณิชกุล (GH: HomieZ09) This is my portfolio website. 
    I'm a student at Kasetsart University, majoring in Computer Science.
    I'm interested in web-app development, game development, and data science.`,
    url: 'https:phumrapee.me',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
        width: 800,
        height: 600,
      },
      {
        url: 'https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no',
        width: 1800,
        height: 1600,
        alt: 'Phumrapee Soenvanichakul (HomieZ09)',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}>
        <Webring />
        <Navbar />
        <div className="flex justify-center">
          <div className="container px-5">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
