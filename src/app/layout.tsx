import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Webring } from "@/components/Webring";
import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";
import AntdStyledComponentsRegistry from "@/components/AntdStyleRegistry";
import { kanit } from "@/libs/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  icons: '/icon.webp',
  title: 'Phumrapee Soenvanichakul | SYSTEM TERMINAL',
  description: 'Mission logs and tech tree of a Software Engineer.',
  openGraph: {
    title: 'Phumrapee Soenvanichakul | SYSTEM TERMINAL',
    description: 'Mission logs and tech tree of a Software Engineer.',
    url: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Analytics />
      <SpeedInsights/>
      <body className={`${kanit.className} bg-neutral-950 text-emerald-400 antialiased selection:bg-emerald-500 selection:text-black overflow-x-hidden min-h-screen`}>
        {/* Game Grid Background & Glow */}
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#04785715_1px,transparent_1px),linear-gradient(to_bottom,#04785715_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_800px_at_50%_-30%,#00ff6610,transparent)]"></div>
        <div className="fixed inset-0 z-[-1] bg-black/40"></div>
        
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              borderRadius: '0px',
              background: '#0a0a0a',
              color: '#34d399',
              border: '1px solid #059669',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              fontSize: '12px'
            },
          }} 
        />
        <Webring />
        <div className="flex flex-col min-h-screen relative">
          <AntdStyledComponentsRegistry>
            <Navbar />
            <main className="flex-grow relative">
              {children}
            </main>
          </AntdStyledComponentsRegistry>
          <Footer />
        </div>
      </body>
    </html>
  );
}
