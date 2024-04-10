'use client';

import { Icon } from '@iconify/react';
import { motion } from "framer-motion";
import { saveAs } from 'file-saver';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = () => {
    const router = useRouter();
    const buttonHandler = (path: string) => {
        switch (path) {
            case "download-cv":
                saveAs("https://export-download.canva.com/od_90/DAF1djod_90/39/0-8095644753839204858.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20240410%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240410T032358Z&X-Amz-Expires=28217&X-Amz-Signature=ef353bd59769f5ceea10f31c18af5766299f764e9005a94759a2a8c0ab855d9c&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27Phumrapee%2520soenvanichakul.pdf&response-expires=Wed%2C%2010%20Apr%202024%2011%3A14%3A15%20GMT", "RESUME_Phumrapee_Soenvanichakul.pdf");
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
                        onClick={() => buttonHandler("download-cv")}
                        whileHover={{ scale: 1.05 }}
                        className="flex space-x-2 items-center p-2 rounded-full border-black border">
                        <Icon icon="material-symbols-light:download" />
                        <span className="text-sm">Download CV</span>
                    </motion.button>
                </div>
            </div>
        </>
    )
}