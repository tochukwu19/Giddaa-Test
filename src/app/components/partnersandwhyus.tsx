import React from 'react';
import { ArrowUpRight, CookingPotIcon } from 'lucide-react';

const PartnersAndWhyUs = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <section className="mb-24">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#274728] mb-4 short-border spectral-bold-normal">Our Partners</h2>
                    <p className="max-w-2xl text-sm md:text-base mx-auto text-gray-600">
                        Organizations {`we've`} partnered with to make real estate in<br />
                        Nigeria a pleasant experience for all.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {['GOVERNMENT', 'PROPERTY DEVELOPERS', 'PROPERTY MANAGERS', 'FINANCIAL INSTITUTIONS', 'NON-GOVERNMENTAL ORGANIZATIONS'].map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full text-xs md:text-sm ${category === 'GOVERNMENT' ? 'bg-[#274728] text-white' : 'bg-white text-[#274728] hover:bg-[#274728] hover:text-white'} border-2 border-[#274728] transition duration-300`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6 mb-12">
                    {Array(9).fill(0).map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-full w-24 h-24 mx-auto"></div>
                    ))}
                </div>

                <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-4xl font-medium text-gray-300">Over 50 Partners</h3>
                </div>

                <div className="text-center">
                    <button className="w-fit mx-auto bg-[#274728] text-white py-2 px-4 rounded-full flex items-center hover:bg-green-900 transition-colors gap-2 text-sm md:text-base">
                        View All Partners
                        <div className='bg-white rounded-full p-2'>
                            <ArrowUpRight className="text-[#274728] h-5 w-5" />
                        </div>
                    </button>
                </div>
            </section> 

            <section className="relative">
                <div className="relative rounded-3xl pt-16 pb-12 px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#274728] mb-4 short-border spectral-bold-normal">Why Giddaa</h2>
                        <p className="max-w-2xl text-sm md:text-base mx-auto text-gray-600">
                            Reasons why you should embark on your real estate journey with<br />
                            us, and our products.
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border-2 border-[#274728] shadow-sm hover:shadow-md transition duration-300">
                                <div className="mb-4">
                                    <CookingPotIcon className="text-[#274728]" size={24} />
                                </div>
                                <h3 className="text-base md:text-lg text-black font-bold mb-3">Stay Fully Booked</h3>
                                <p className="text-gray-600 text-sm">
                                    Order from our vendors and restaurant up till 12am
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnersAndWhyUs;