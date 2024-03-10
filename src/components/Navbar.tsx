'use client';

import { Icon } from '@iconify/react';
import { motion } from "framer-motion";
import { saveAs } from 'file-saver';
import { Toaster, toast } from 'react-hot-toast';

export const Navbar = () => {
    const buttonHandler = (path: string) => {
        switch (path) {
            case "download-cv":
                saveAs("/resume.txt", "resume.txt");
                toast.success('Successfully toasted!');
                break;
        }
    }
    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <div className="flex justify-center ">
                <nav className="container flex justify-center">
                    <div className="container flex items-center justify-between p-5 pb-3 border-b border-gray-300">
                        <span className="font-bold text-2xl tracking-tight">Portfolio</span>
                        <motion.button
                        onClick={() => buttonHandler("download-cv")}
                        whileHover={{ scale: 1.05 }}
                        className="flex space-x-2 items-center p-2 rounded-full border-black border">
                            <Icon icon="material-symbols-light:download" />
                            <span className="text-sm">Download CV</span>
                        </motion.button>
                    </div>
                </nav>
            </div>
        </>
    )
}