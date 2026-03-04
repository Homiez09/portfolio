'use client';

import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useEffect, useState } from 'react';

export const Navbar = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <header className="fixed top-0 left-0 right-0 z-[1000] p-2 md:p-4 pointer-events-none">
            <nav className={`pointer-events-auto max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6 py-2 md:py-3 bg-neutral-950/90 backdrop-blur-md border-b-2 border-emerald-500/50 rounded-none transition-all duration-300 ${scrolled ? 'shadow-[0_0_20px_rgba(16,185,129,0.15)]' : ''}`}>
                <Link href="/" className="group flex items-center gap-2 md:gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    <span className="font-black text-sm md:text-xl tracking-widest text-emerald-400 uppercase font-mono">SYS_TERM</span>
                </Link>
                
                <div className="flex gap-4 md:gap-8 items-center">
                    <div className="hidden lg:flex gap-4 text-[10px] text-emerald-500/60 uppercase tracking-widest mr-4 font-mono">
                        <span>HP: <span className="text-emerald-400">100/100</span></span>
                        <span>MP: <span className="text-emerald-400">100/100</span></span>
                    </div>
                    <Link href="/" className={`text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all font-mono ${
                        pathname === '/' ? 'text-emerald-400 [text-shadow:0_0_8px_#34d399]' : 'text-emerald-800 hover:text-emerald-400'
                    }`}>
                        [ QUESTS ]
                    </Link>
                    <Link href="/search" className={`text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all font-mono ${
                        pathname === '/search' ? 'text-emerald-400 [text-shadow:0_0_8px_#34d399]' : 'text-emerald-800 hover:text-emerald-400'
                    }`}>
                        [ SEARCH ]
                    </Link>
                    <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-emerald-900 line-through font-mono cursor-not-allowed">
                        [ LORE ]
                    </span>
                </div>
            </nav>
        </header>
    )
}
