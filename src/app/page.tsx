'use client';

import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { Icon } from '@iconify/react';
import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';

export default function Home() {
  const iconStyle = {
    height: "36",
    width: "36",
    style: {
      color: "#161616"
    }
  }

  return (
    <div className="select-none">
      <Navbar />
      <main className="flex justify-center mt-28 max-[1350px]:mt-6 w-full">
        <div className="flex container max-[1350px]:w-auto">
          <div className="flex flex-col w-full mx-5 items-center justify-center">
            <div className="flex flex-row w-full max-[1350px]:flex-col-reverse gap-5 items-center justify-center  max-[1350px]:px-0">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 100, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col h-full w-full justify-center max-[1350px]:items-center">
                <span className="font-bold md:text-2xl text-xl text-gray-700">HELLO I'M</span>
                <span className="font-bold md:text-6xl text-3xl tracking-[-0.05em]">PHUMRAPEE</span>
                <span className="font-bold md:text-6xl text-3xl tracking-[-0.05em]">SOENVANICHAKUL</span>
                <span className="mt-5 font-bold md:text-2xl text-gray-500">
                  <Typewriter onInit={(typewriter) => {
                    typewriter.typeString('Hello World!')
                      .pauseFor(1500)
                      .deleteAll()
                    typewriter.typeString('Frontend Developer ᓚᘏᗢ.')
                      .start();
                  }} /></span>

                <div className="mt-16 flex flex-row h-10 w-full gap-4 justify-center">
                  <a href="https://github.com/Homiez09" target="_blank"><Icon icon="bi:github" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></a>
                  <a href="https://www.instagram.com/prpswa_/" target="_blank"><Icon icon="bi:instagram" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></a>
                  <a href="https://www.facebook.com/phumrapee.soenvanichakul.3/" target="_blank"><Icon icon="bi:facebook" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 100, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex w-full justify-end max-[1350px]:justify-center">
                <Image onClick={() => {
                  const el = document.getElementById("profile-phum");
                  if (el!.classList.contains("image-popup")) {
                    el!.classList.remove("image-popup");
                    return;
                  }
                  el!.classList.add("image-popup");
                }}
                  id="profile-phum" className="w-auto rounded-full drop-shadow-md cursor-pointer" src="/phum.jpeg" alt="Phumrapee Soenvanichakul (HomieZ09)" width={500} height={500} />
              </motion.div>

            </div>
          </div>
        </div>
      </main>
    </div>

  );
}
