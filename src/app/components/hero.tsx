"use client"

import React from 'react';
import { MoveRightIcon, MoveUp } from 'lucide-react';
import WaveHand from "@/app/assets/Waving Hand.svg"
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {

    return (
        <div className="w-full bg-white">
            <div className="max-w-6xl mx-auto px-4 py-24 md:py-20">
                <div className="relative mb-8 hidden md:flex flex-col md:flex-row border border-solid border-[#F0F0F0] w-fit mx-auto rounded-md md:rounded-full justify-center items-center gap-4 md:gap-8 py-2 px-2 md:py-4 md:px-4 text-xs md:text-sm text-[#274728] font-medium" style={{ background: "linear-gradient(90deg, rgba(255, 255, 251, 0.5) 0%, rgba(246, 253, 244, 0.5) 50%, rgba(255, 237, 203, 0.5) 100%)" }}>
                    <div className="rounded-full">
                        WE SERVE NIGERIANS ACROSS THE GLOBE
                    </div>
                    <div className="hidden md:block border-l border-gray-300 h-8 mx-2"></div>
                    <div className="rounded-full flex  gap-1 items-center">
                        👀
                        <span>10,000 PEOPLE HAVE SEEN THIS</span>
                    </div>

                    <motion.div
                        animate={{
                            y: [0, -5, 0]
                        }}
                        transition={{
                            y: {
                                duration: 1,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "reverse"
                            }
                        }} className='hidden lg:flex giddaa-buy absolute right-[-400px] bottom-[-10px] items-center justify-center w-[330px] h-[130px] text-black'>
                        <div className='flex gap-2 items-start justify-center'>
                            <Image src={WaveHand} alt="hand waves" />
                            <div>
                                <h2 className='text-base font-medium mb-2'>You’re Now on Giddaa <span className='text-[#274728]'>Buy</span></h2>
                                <p className='font-light text-sm'>Find and buy your dream home on<br /> various purchase plans.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="text-center mb-8 text-black">
                    <h1 className="text-4xl md:text-6xl font-bold md:mb-4 spectral-bold-normal ">
                        Find a Home to Buy In Nigeria
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 spectral-bold-normal ">
                        On Various <span className="text-green-700">Purchase Plans.</span>
                    </h2>

                    <p className="text-black !leading-[28px] !md:leading-[36px] text-base md:text-lg max-w-4xl mx-auto">
                        We have taken real estate beyond <span className="underline">mere listings</span>. Conduct secure real estate transactions on our platform
                        trusted by more than <strong>4,000 customers, and 30+ companies</strong>
                    </p>
                </div>

                <div className="flex justify-center mt-10 mb-16">
                    <Link href={"/login"} className="bg-[#274728] hover:bg-green-900 text-white font-medium py-4 px-8 rounded-full flex items-center gap-2">
                        Login
                        <div className='bg-white rounded-full p-2'>
                            <MoveRightIcon className="h-5 w-5 text-[#274728]" />
                        </div>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-8 relative">
                    <div className="w-full md:w-1/2 rounded-[25px] overflow-hidden h-80 parallax-1" />

                    <div className="w-full md:w-1/2 rounded-[25px] overflow-hidden h-80 parallax-2" />

                    <div className="w-full md:w-1/4 rounded-[25px] overflow-hidden h-80 parallax-3" />

                    <motion.div
                        animate={{
                            y: [0, -5, 0]
                        }}
                        transition={{
                            y: {
                                duration: 1,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "reverse"
                            }
                        }} className="absolute right-[-90px] bottom-0 w-20 h-20 hidden lg:flex items-center justify-center rounded-full bg-gradient-to-r from-[#EAA315] to-[#335F32] p-[4px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <MoveUp size={30} className='text-[#274728]' strokeWidth={3} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;