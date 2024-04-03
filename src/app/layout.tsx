import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Phumrapee Soenvanichakul',
  openGraph: {
    title: 'Phumrapee Soenvanichakul',
    description: `
    I'm Phumrapee Soenvanichakul | ภูมิระพี เสริญวณิชกุล (GH: HomieZ09) This is my portfolio website. 
    I'm a student at Kasetsart University, majoring in Computer Science.
    I'm interested in web-app development, game development, and data science.`,
    url: 'https:phumrapee.me',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1LWni2W7QnSY_Nqt5O3Qjz-R18Oq8t6xf',
        width: 800,
        height: 600,
      },
      {
        url: 'https://drive.google.com/uc?export=view&id=1LWni2W7QnSY_Nqt5O3Qjz-R18Oq8t6xf',
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
        <Navbar />
        <div className="flex justify-center mt-8">
          <div className="container px-5">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
