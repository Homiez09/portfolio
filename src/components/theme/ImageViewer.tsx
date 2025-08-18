'use client';

import { useState, useEffect } from 'react';
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

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
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
    }, [isOpen, images.length, onClose]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    if (!isOpen || images.length === 0) return null;

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-90 transition-opacity"
                onClick={onClose}
            />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                aria-label="Close image viewer"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Main content container */}
            <div className="relative w-full h-full">
                {/* Image container with strict boundaries */}
                <div className="absolute inset-0 flex items-center justify-center" style={{
                    top: '30px',    // Space for close button
                    bottom: '170px', // Space for thumbnails and counter
                    left: '80px',   // Space for navigation arrows
                    right: '80px'   // Space for navigation arrows
                }}>
                    <div className="relative w-auto max-w-full h-full flex items-center justify-center rounded-xl">
                        <Image
                            src={images[currentIndex].url}
                            alt={`Screenshot ${currentIndex + 1}`}
                            width={images[currentIndex].width}
                            height={images[currentIndex].height}
                            className="object-contain w-full h-full rounded-xl"
                            priority
                        />
                    </div>
                </div>

                {/* Navigation arrows - positioned outside image area */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 shadow-lg"
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 shadow-lg"
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Bottom UI - Fixed at bottom with safe spacing */}
                <div className="absolute bottom-0 left-0 right-0 z-30 pb-6">
                    {/* Image counter */}
                    {images.length > 1 && (
                        <div className="flex justify-center mb-4">
                            <div className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-full shadow-lg">
                                {currentIndex + 1} / {images.length}
                            </div>
                        </div>
                    )}

                    {/* Thumbnail navigation */}
                    {images.length > 1 && (
                        <div className="flex justify-center">
                            <div className="flex gap-2 max-w-screen-lg overflow-x-auto px-4 py-2 bg-black bg-opacity-30 rounded-lg scrollbar-hide">
                                {images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`relative w-14 h-14 rounded border-2 transition-all overflow-hidden flex-shrink-0 shadow-md ${index === currentIndex
                                                ? 'border-white shadow-lg scale-110'
                                                : 'border-gray-400 hover:border-gray-200 hover:scale-105'
                                            }`}
                                    >
                                        <Image
                                            src={image.url}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="56px"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
