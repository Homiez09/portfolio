import { Kanit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Webring } from "@/components/Webring";
import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";
import AntdStyledComponentsRegistry from "@/components/AntdStyleRegistry";
import { Suspense } from "react";

const kanit = Kanit({ subsets: ["latin"], weight: ["300", "700"] });

export const metadata = {
  title: 'Phumrapee Soenvanichakul',
  description: `I'm Phumrapee Soenvanichakul | ภูมิระพี เสริญวณิชกุล (GH: HomieZ09) This is my portfolio website. 
  I'm a student at Kasetsart University, majoring in Computer Science.
  I'm interested in software engineering, full-stack`,
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
    I'm interested in software engineering, full-stack`,
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
      <body className={kanit.className}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Webring />
        <Navbar />
        <div className="container px-5">
          <AntdStyledComponentsRegistry>
            {children}
          </AntdStyledComponentsRegistry>
        </div>
        <Footer />
      </body>
    </html>
  );
}
