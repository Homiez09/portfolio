'use client';

import Image from "next/image";
import Typewriter from 'typewriter-effect';
import { Icon } from '@iconify/react';
import { useRouter } from "next/navigation";
import { Button } from 'antd';

export default () => {
  const router = useRouter();
  
  const iconStyle = {
    height: "25",
    width: "25",
    style: {
      color: "#161616"
    }
  }
  return (
    <>
      <div className="flex flex-col justify-center max-lg:w-auto h-screen">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex flex-row w-full max-lg:flex-col gap-5 items-center justify-center">
            <div className="flex w-full justify-center">
              <Image
                id="profile-phum"
                className="drop-shadow-md object-cover"
                src="https://lh3.googleusercontent.com/a/ACg8ocJl6Yr607SyJ-4qtKDVks21ElvmMNHsGWMtyEgoQI8R1Gs=s288-c-no"
                alt="Phumrapee Soenvanichakul (HomieZ09)"
                width={288}
                height={288}
              />
            </div>

            <div className="flex flex-col w-full justify-center max-lg:items-center">
              <span className="font-bold lg:text-2xl text-xl text-gray-700">HELLO I'M</span>
              <span className="font-bold lg:text-6xl text-3xl tracking-[-0.05em]">PHUMRAPEE</span>
              <span className="font-bold lg:text-6xl text-3xl tracking-[-0.05em]">SOENVANICHAKUL</span>
              <span className="mt-5 font-bold lg:text-2xl text-gray-500">
                <Typewriter onInit={(typewriter) => {
                  typewriter.typeString('Hello World!')
                    .pauseFor(1500)
                    .deleteAll()
                  typewriter.typeString('Frontend Developer ᓚᘏᗢ.')
                    .start();
                }} />
              </span>
              <div className="mt-5 flex flex-row max-lg:justify-center items-center h-10 w-full gap-4">
                <a href="https://github.com/Homiez09" target="_blank"><Icon icon="bi:github" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></a>
                <a href="https://www.instagram.com/prpswa_/" target="_blank"><Icon icon="bi:instagram" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></a>
                <a href="https://www.facebook.com/phumrapee.soenvanichakul.3/" target="_blank"><Icon icon="bi:facebook" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></a>
                <Button type="default" shape="default" size="large" className=' w-fit' onClick={() => router.push("/project")}>Project</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
