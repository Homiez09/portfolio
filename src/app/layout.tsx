import { Kanit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Webring } from "@/components/Webring";
import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";
import AntdStyledComponentsRegistry from "@/components/AntdStyleRegistry";

const kanit = Kanit({ subsets: ["latin"], weight: ["300", "700"] });

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
