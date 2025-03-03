/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Product1 from "@/app/assets/product1.png"
import Product2 from "@/app/assets/product2.png"
import Product3 from "@/app/assets/product3.png"
import Product4 from "@/app/assets/product4.png"
import Product5 from "@/app/assets/product5.png"
import Product6 from "@/app/assets/product6.png"


const cardsData = [
    [
        {
            title: "Buy",
            description:
                "Explore and purchase your home from top developers & vetted property sellers (With land titles) on various purchase plans and long term loan options.",
            buttonText: "Find a Home to Buy",
            buttonLink: "/buy",
            image: Product1,
            bg: "#fff"
        },
        {
            title: "Short Lets",
            description:
                "Find your next getaway spot, staycation, or business trip spot. Avoid extra charges, find detailed information, and reserve a short let.",
            buttonText: "Reserve a Short Let",
            buttonLink: "/short-lets",
            image: Product2,
            bg: "#F9F9F0"
        },
    ],
    [
        {
            title: "Invest",
            description:
                "Become a real estate investor without breaking the bank. Invest in real estate assets and grow your portfolio with friends and family (in a private investment group) or with the public (fractionally, like a stock exchange).",
            buttons: [
                { text: "Find an Investment", link: "/invest" },
                { text: "Learn More", link: "/invest-info" },
            ],
            image: Product3,
            bg: "#FFFFE8"
        },
        {
            title: "Sell",
            description:
                "Sell your property with us, a company and partner you can trust. Our simple process makes it easy for sellers to list their properties and sell their properties on various purchase plans to the 1000's of potential buyers who visit Gidda monthly.",
            buttons: [
                { text: "Sell Your Property", link: "/sell" },
                { text: "Talk To Our Team", link: "/contact" },
            ],
            image: Product4,
            bg: "#F9FAFB"
        },
    ],
    [
        {
            title: "Services",
            description:
                "Explore and purchase homes from top developers & vetted property sellers (With land titles) on various purchase plans.",
            buttonText: "Find a Home to Buy",
            buttonLink: "/services",
            image: Product5,
            bg: "#F5FDFF"
        },
        {
            title: "Enterprise",
            description:
                "We've built solutions & tools for property developers, and property managers specifically operating in the Nigerian Market - Our solutions fit like a glove.",
            buttonText: "Learn More",
            buttonLink: "/enterprise",
            image: Product6,
            bg: "#FFFDFA"
        },
    ],
];


const ProductsSection = () => {
    return (
        <div className="products relative bg-white rounded-3xl border border-transparent max-w-7xl mx-auto px-6 py-12 my-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-2 spectral-bold-normal">Products</h2>
                <div className="w-20 h-0.5 bg-green-800 mx-auto mb-6"></div>
                <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
                    Get started with one of our carefully crafted products & services.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

                {cardsData[0].map((card: any, id) => (
                    <div key={id} className="shadow-custom rounded-3xl border-2 border-[#274728] overflow-hidden flex flex-col md:flex-row">
                        <div className="p-6 flex-1 flex flex-col justify-between" style={{ backgroundColor: `${card.bg}` }}>
                            <h3 className="text-xl md:text-2xl font-medium mb-4 text-black">{card.title}</h3>
                            <p className="text-gray-700 mb-8 text-sm md:text-base">
                                {card.description}
                            </p>
                            <button className="w-fit bg-green-800 text-white py-2 px-4 rounded-full flex items-center hover:bg-green-900 transition-colors gap-2 text-sm md:text-base">
                                {card.buttonText}
                                <div className='bg-white rounded-full p-2'>
                                    <ArrowUpRight className="text-[#274728] h-5 w-5" />
                                </div>
                            </button>
                        </div>
                        <div className="md:w-2/5 h-[300px] md:h-auto">
                            <Image
                                src={card.image}
                                alt="Happy couple in front of their new home"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}

                {cardsData[1].map((card: any, id) => (
                    <div key={id} className="shadow-custom rounded-2xl border-2 border-green-800 overflow-hidden flex flex-col-reverse md:flex-col" style={{ backgroundColor: `${card.bg}` }}>
                        <div className="p-6">
                            <h3 className="text-xl md:text-2xl font-medium mb-4 text-black">{card.title}</h3>
                            <p className="text-gray-700 mb-8 text-sm md:text-base">
                                {card.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="w-fit bg-green-800 text-white py-2 px-4 rounded-full flex items-center hover:bg-green-900 transition-colors gap-2">
                                    {card.buttons[0].text}
                                    <div className='bg-white rounded-full p-2'>
                                        <ArrowUpRight className="text-[#274728] h-5 w-5" />
                                    </div>
                                </button>
                                <button className="border-2 border-green-800 text-green-800 bg-white py-2 px-4 rounded-full hover:bg-gray-50 transition-colors text-sm md:text-base">
                                    {card.buttons[1].text}
                                </button>
                            </div>
                        </div>
                        <div className="h-[300px] md:h-64">
                            <Image
                                src={card.image}
                                alt="Row of modern townhouses as investment properties"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                ))}

                {cardsData[2].map((card: any, id) => (
                    <div key={id} className="shadow-custom rounded-3xl border-2 border-[#274728] overflow-hidden flex flex-col md:flex-row">
                        <div className="p-6 flex-1 flex flex-col justify-between" style={{ backgroundColor: `${card.bg}` }}>
                            <h3 className="text-xl md:text-2xl font-medium mb-4 text-black">{card.title}</h3>
                            <p className="text-gray-700 mb-8 text-sm md:text-base">
                                {card.description}
                            </p>
                            <button className="w-fit bg-green-800 text-white py-2 px-4 rounded-full flex items-center hover:bg-green-900 transition-colors gap-2 text-sm md:text-base">
                                {card.buttonText}
                                <div className='bg-white rounded-full p-2'>
                                    <ArrowUpRight className="text-[#274728] h-5 w-5" />
                                </div>
                            </button>
                        </div>
                        <div className="md:w-2/5 h-[300px] md:h-auto">
                            <Image
                                src={card.image}
                                alt="Happy couple in front of their new home"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsSection;