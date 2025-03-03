"use client"

import React, { useState } from 'react';
import Profile from "@/app/assets/testimonial.jpg"
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';

const TestimonialSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
            setIsPlaying(!isPlaying);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <section className="mb-24">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#274728] mb-4 short-border spectral-bold-normal">People Talk</h2>
                    <p className="max-w-2xl text-sm md:text-base mx-auto text-gray-600">
                        What our customers and partners think about us.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {['BUY', 'SHORTLETS', 'INVEST', 'SELL', 'SERVICES', 'ENTERPRISE'].map((service) => (
                        <button
                            key={service}
                            className={`px-6 py-2 rounded-full text-xs md:text-sm ${service === 'BUY' ? 'bg-[#274728] text-white' : 'bg-white text-[#274728] hover:bg-[#274728] hover:text-white'} border-2 border-[#274728] transition duration-300`}
                        >
                            {service}
                        </button>
                    ))}
                </div>

                <div className="bg-white">
                    <div className="flex flex-col md:flex-row border-2 border-solid border-green-800 overflow-hidden rounded-2xl">
                        <div className="w-full md:w-1/2 p-8 md:p-10 bg-gradient-to-b to-green-50 from-amber-50">
                            <Image
                                className='overflow-hidden h-48 w-48 object-cover rounded-xl'
                                src={Profile}
                                alt="Testimonial"
                            />
                            <div className='my-4'>
                                <h4 className="font-bold text-black text-base md:text-xl mb-2">Chima Okereke</h4>
                                <p className="text-[#274728] font-medium text-sm">Director of Sales at Bilaad Realty</p>
                            </div>
                            <div className="mb-6">
                                <p className="text-black text-xs md:text-sm leading-relaxed">
                                    {`"`}I had an outstanding experience with the short-let booking service!
                                    From start to finish, the team made the entire process smooth and easy. I
                                    needed help finding the perfect place for my stay, and they went above
                                    and beyond to locate a property that fit all my requirements. Once I
                                    confirmed and made the payment, they handled the reservation with
                                    great efficiency.
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:block w-full border-l-2 border-solid border-green-800 md:w-1/2 bg-gray-100 relative video-bg">
                            <button
                                onClick={togglePlay}
                                className="absolute inset-0 flex items-center justify-center focus:outline-none"
                                aria-label={isPlaying ? "Pause video" : "Play video"}
                            >
                                <div className="bg-white border-2 border-[#274728] w-16 h-16 rounded-full flex items-center justify-center transition duration-300">
                                    {isPlaying ? (
                                        <Pause className="text-[#274728]" fill='#274728'  size={28} />
                                    ) : (
                                        <Play className="text-[#274728] ml-1" fill='#274728'  size={28} />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TestimonialSection;