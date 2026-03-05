interface HeroSectionProps {
    totalRecords: number;
}

export const HeroSection = ({ totalRecords }: HeroSectionProps) => {
    return (
        <header className="flex flex-col items-start gap-4 md:gap-6 py-10 md:py-16 relative border-l-4 border-emerald-500 pl-4 md:pl-10 mb-8 md:mb-12">
            {/* Techy corner decors */}
            <div className="absolute top-0 left-0 w-6 md:w-8 h-1 bg-emerald-500"></div>
            <div className="absolute bottom-0 left-0 w-6 md:w-8 h-1 bg-emerald-500"></div>
            
            <div className="flex items-center gap-2 md:gap-3">
                <span className="animate-ping w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-none border border-red-400"></span>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-red-500 uppercase font-mono">
                    Player 1 Ready
                </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[1.1] [text-shadow:2px_2px_0px_#047857] md:[text-shadow:4px_4px_0px_#047857]">
                CHOOSE YOUR <br />
                <span className="text-emerald-400 [text-shadow:none]">MISSION.</span>
            </h1>
            
            <div className="max-w-2xl text-sm md:text-base text-emerald-400/70 font-mono mt-4 space-y-1">
                <p>{'>'} INITIALIZING DATABASE...</p>
                <p className="animate-[fade-in_1s_ease-in-out_0.5s_forwards] opacity-0">{'>'} LOADED <span className="text-emerald-300 font-bold">{totalRecords}</span> RECORDS INTO MEMORY.</p>
                <p className="animate-[fade-in_1s_ease-in-out_1s_forwards] opacity-0 text-emerald-300">{'>'} SELECT A QUEST LOG TO PROCEED_</p>
            </div>
        </header>
    );
};
