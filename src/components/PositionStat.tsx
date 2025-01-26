'use client';

import Typewriter from 'typewriter-effect';

export const PositionStat = () => {
    return (
        <span className="mt-5 font-extralight lg:text-3xl text-gray-500">
            <Typewriter onInit={(typewriter) => {
                typewriter.typeString('Hello World!')
                    .pauseFor(1500)
                    .deleteAll()
                typewriter.typeString('Programmer ᓚᘏᗢ.')
                    .start();
            }} />
        </span>
    );
}