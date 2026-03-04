'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { IMedia } from '@/interface/media';

interface ImageViewerProps {
    images: IMedia[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export const ImageViewer = ({ images, initialIndex, isOpen, onClose }: ImageViewerProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, [images.length]);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    goToNext();
                    break;
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, goToPrevious, goToNext, onClose]);

    if (!isOpen || images.length === 0) return null;

    // Optimization: Pre-calculate neighboring indices for pre-fetching
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono">
            {/* Backdrop with CRT-like scanlines */}
            <div
                className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md transition-opacity cursor-zoom-out"
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>
            </div>

            {/* Top HUD Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-3 md:p-6 border-b border-emerald-500/30 bg-neutral-950/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-emerald-500 text-[10px] md:text-sm uppercase tracking-widest">
                    <span className="animate-pulse bg-emerald-500 w-1.5 md:w-2 h-1.5 md:h-2 block"></span>
                    <span>INTEL_VIEWER // IMG_{currentIndex + 1}_{images.length}</span>
                </div>
            </div>

            {/* Prominent Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-8 z-[10000] p-2 md:p-3 bg-neutral-950 border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-neutral-950 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-90 group"
                aria-label="Close viewer"
            >
                <svg className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Main Content Area */}
            <div className="relative w-full flex-grow flex items-center justify-center p-2 md:p-12 mt-12 md:mt-16 mb-24 md:mb-32">
                {/* Corner Accents */}
                <div className="absolute top-6 md:top-10 left-6 md:left-10 w-6 md:w-10 h-6 md:h-10 border-t-2 border-l-2 border-emerald-500/40 pointer-events-none"></div>
                <div className="absolute top-6 md:top-10 right-6 md:right-10 w-6 md:w-10 h-6 md:h-10 border-t-2 border-r-2 border-emerald-500/40 pointer-events-none"></div>
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 w-6 md:w-10 h-6 md:h-10 border-b-2 border-l-2 border-emerald-500/40 pointer-events-none"></div>
                <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 w-6 md:w-10 h-6 md:h-10 border-b-2 border-r-2 border-emerald-500/40 pointer-events-none"></div>

                {/* Navigation Buttons (Desktop) */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 md:left-10 z-30 p-4 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-neutral-950 hover:border-emerald-500 transition-all group hidden sm:block"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Image Display */}
                <div className="relative w-full h-full max-w-6xl max-h-[70vh] flex items-center justify-center group/img border border-emerald-500/10 p-2 bg-neutral-900/30">
                    <Image
                        src={images[currentIndex].url}
                        alt={`Intel log ${currentIndex + 1}`}
                        width={images[currentIndex]?.width || 1920}
                        height={images[currentIndex]?.height || 1080}
                        className="object-contain w-full h-full animate-in fade-in zoom-in-95 duration-300"
                        priority
                    />
                    
                    {/* Optimization: Invisible images to trigger pre-fetching */}
                    <div className="hidden">
                        <Image src={images[nextIndex].url} width={100} height={100} alt="prefetch" />
                        <Image src={images[prevIndex].url} width={100} height={100} alt="prefetch" />
                    </div>
                </div>

                <button
                    onClick={goToNext}
                    className="absolute right-4 md:right-10 z-30 p-4 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-neutral-950 hover:border-emerald-500 transition-all group hidden sm:block"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Bottom Thumbnail HUD */}
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-emerald-500/30 bg-neutral-900/80 backdrop-blur-sm p-4">
                <div className="max-w-4xl mx-auto flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-neutral-900">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative w-20 h-12 flex-shrink-0 border transition-all duration-300 ${
                                index === currentIndex
                                    ? 'border-emerald-400 p-0.5 scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                    : 'border-emerald-900/40 opacity-50 hover:opacity-100 hover:border-emerald-700'
                            }`}
                        >
                            <Image
                                src={image.url}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
                <div className="flex justify-center mt-2">
                    <div className="text-[10px] text-emerald-600 uppercase tracking-[0.3em]">
                        NAVIGATE VIA ARROWS OR CLICK_THUMBNAILS
                    </div>
                </div>
            </div>
        </div>
    );
};
