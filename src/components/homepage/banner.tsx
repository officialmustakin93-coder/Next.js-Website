import Image from "next/image";
import React from 'react';
import bannerImg from '@/assets/banner.png';

const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-start text-left gap-4 max-w-xl">
                <h3 className="text-yellow-400 font-bold uppercase tracking-wider text-sm">
                    WORKOUT LIBRARY
                </h3>

                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight  leading-none">
                    TRAIN WITH<br />INTENT.LOG EVERY SET.
                </h1>

                <p className=" text-sm md:text-base">
                    FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week work add up.
                </p>

                <button className="btn bg-yellow-400 text-black hover:bg-yellow-500 border-none font-bold px-6 mt-2">
                    BROWSE WORKOUTS
                </button>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
                <Image src={bannerImg} alt="Banner" className="w-full h-auto object-cover" />
            </div>
        </div>
    );
};

export default Banner;