import Image from "next/image";
import { Social } from "@/components/Social";
import { PositionStat } from "@/components/PositionStat";

export default () => {  
  return (
    <>
      <div className="flex flex-col justify-center max-lg:w-auto h-screen">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex flex-row w-full max-lg:flex-col gap-5 items-center justify-center">
            <div className="flex w-full justify-center">
              <Image
                id="profile-phum"
                className="drop-shadow-md object-cover rounded-lg"
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
              <PositionStat />
              <Social />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
