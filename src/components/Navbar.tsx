'use client';

import { Icon } from '@iconify/react';
import { motion } from "framer-motion";
import { saveAs } from 'file-saver';
import { toast } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = () => {
    const router = useRouter();
    const buttonHandler = (path: string) => {
        switch (path) {
            case "download-resume":
                saveAs("resume/RESUME_Phumrapee_Soenvanichakul.pdf", "RESUME_Phumrapee_Soenvanichakul.pdf");
                toast.success('Successfully toasted!');
                break;
        }
    }
    return (
        <>
            <div className='flex justify-center'>
                <div className={`flex container justify-between border-b border-gray-300 p-5 pb-3 top-0 ${(usePathname() === "/") ? 'absolute' : ''}`}>
                    <span className="flex font-bold text-2xl tracking-tight hover:cursor-pointer" onClick={() => router.push('/')}>Portfolio</span>

                    <motion.button
                        onClick={() => buttonHandler("download-resume")}
                        whileHover={{ scale: 1.05 }}
                        className="flex space-x-2 items-center p-2 rounded-full border-black border">
                        <Icon icon="material-symbols-light:download" />
                        <span className="text-sm">Download Resume</span>
                    </motion.button>
                </div>
            </div>
        </>
    )
}