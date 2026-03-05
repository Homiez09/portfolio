import Image from "next/image";
import { IMedia } from "@/interface/media";

interface IntelGalleryProps {
    screenshots?: IMedia[];
    onOpenViewer: (index: number) => void;
}

export const IntelGallery = ({ screenshots, onOpenViewer }: IntelGalleryProps) => {
    return (
        <section>
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-bold text-emerald-500 uppercase tracking-widest font-mono">ATTACHED_INTEL</h2>
                <div className="flex-grow h-px bg-emerald-900/50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {screenshots?.map((screenshot, index) => (
                    <div 
                        key={screenshot.id} 
                        className="group relative cursor-pointer border border-emerald-900/50 bg-neutral-900 p-1 hover:border-emerald-400 transition-colors duration-300"
                        onClick={() => onOpenViewer(index)}
                    >
                        <div className="relative aspect-video overflow-hidden bg-neutral-950">
                            <Image
                                src={screenshot.url}
                                alt={`Intel ${index + 1}`}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors mix-blend-overlay"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40 mix-blend-overlay"></div>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/90 px-3 py-1.5 border border-emerald-900/80 text-[10px] text-emerald-400 uppercase font-mono tracking-widest backdrop-blur-sm">
                            INTEL_{index + 1}.IMG
                        </div>
                    </div>
                ))}
            </div>

            {(!screenshots || screenshots.length === 0) && (
                <div className="text-center py-16 border border-dashed border-emerald-900/50 bg-neutral-900/30 text-emerald-700 text-xs font-mono uppercase tracking-widest">
                    [ NO VISUAL DATA ATTACHED TO THIS RECORD ]
                </div>
            )}
        </section>
    );
};
