import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Buy from "@/app/assets/buy.svg"
import Shortlets from "@/app/assets/shortlet.svg"
import Services from "@/app/assets/services.svg"
import Sell from "@/app/assets/sell.svg"
import Invest from "@/app/assets/invest.svg"
import Enterprise from "@/app/assets/enterprise.svg"
import Image from 'next/image';


const GetStartedSection = () => {
  const services = [
    {
      icon: Buy,
      title: "Buy",
      description: "Find homes on various purchase plans; apply to buy them with your account executive.",
    },
    {
      icon: Shortlets,
      title: "Short Lets",
      description: "Explore high quality short lets, with no booking fees and excellent support.",
    },
    {
      icon: Invest,
      title: "Invest",
      description: "Explore high quality short lets, with no booking fees and reserve them",
    },
    {
      icon: Sell,
      title: "Sell",
      description: "Explore high quality short lets, with no booking fees and reserve them",
    },
    {
      icon: Services,
      title: "Services",
      description: "Explore high quality short lets, with no booking fees and reserve them",
    },
    {
      icon: Enterprise,
      title: "Enterprise",
      description: "Explore high quality short lets, with no booking fees and reserve them",
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative bg-white">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#274728] mb-4 short-border spectral-bold-normal">Get Started</h2>
          <p className="max-w-2xl text-sm md:text-base mx-auto text-gray-600">
            Made it this far? What are you waiting for? Get started<br/> with one of our products today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border-2 border-[#274728] shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div className="text-green-800 mb-4">
                <Image
                  src={service.icon}
                  alt='icon'
                />
              </div>
              <h3 className="text-base md:text-xl font-medium text-black mb-3">{service.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-6">
                {service.description}
              </p>
              <button className="w-full mx-auto bg-[#274728] text-white py-2 px-4 rounded-full flex justify-center items-center hover:bg-green-900 transition-colors gap-2 text-sm md:text-base">
                Get Started Now
                <div className='bg-white rounded-full p-2'>
                  <ArrowUpRight className="text-[#274728] h-5 w-5" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;