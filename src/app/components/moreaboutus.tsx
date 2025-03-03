"use client"

import React, { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const AboutSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <section className="mb-24">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#274728] mb-4 short-border spectral-bold-normal">Know More About Us</h2>
                    <p className="max-w-2xl text-sm md:text-base mx-auto text-gray-600">
                        From our teams lips to your ears - {`let's`} tell you about<br /> Giddaa.
                    </p>
                </div>

                <div className="w-full h-[500px] relative video-bg border-2 border-solid border-green-800 overflow-hidden rounded-2xl">
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center focus:outline-none"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                        <div className="bg-white border-2 border-[#274728] w-16 h-16 rounded-full flex items-center justify-center transition duration-300">
                            {isPlaying ? (
                                <Pause className="text-[#274728]" fill='#274728' size={28} />
                            ) : (
                                <Play className="text-[#274728] ml-1" fill='#274728'   size={28} />
                            )}
                        </div>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;