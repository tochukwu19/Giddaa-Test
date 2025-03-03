import React from 'react';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import Tiktok from "@/app/assets/tiktok.svg"
import Whatsapp from "@/app/assets/whatsapp.svg"
import Image from 'next/image';

const Footer = () => {
  const footerLinks = {
    "ABOUT US": [
      { name: "Our Company", url: "#" },
      { name: "Our Team", url: "#" }
    ],
    "PRODUCTS": [
      { name: "Buy", url: "#" },
      { name: "Short Lets", url: "#" },
      { name: "Invest", url: "#" },
      { name: "Sell Your House", url: "#" }
    ],
    "PARTNERS": [
      { name: "Join as a Property Developer", url: "#" },
      { name: "Join as a Lender", url: "#" },
      { name: "Join as an Agent", url: "#" }
    ],
    "RESOURCES": [
      { name: "Tutorials", url: "#" },
      { name: "Watch the Demo", url: "#" },
      { name: "Blog", url: "#" }
    ],
    "CONTACT US": [
      { name: "info@giddaa.com", url: "mailto:info@giddaa.com" },
      { name: "WhatsApp", url: "#" },
      { name: "Book a Meeting", url: "#" },
      { name: "+234 809 762 1751", url: "tel:+2348097621751" }
    ],
    "SITE NAVIGATION": [
      { name: "Home", url: "#" },
      { name: "Properties", url: "#" },
      { name: "Developers", url: "#" },
      { name: "Sell Your House", url: "#" }
    ]
  };

  const socialLinks = [
    { icon: <Instagram size={20} />, url: "#" },
    { icon: <Image src={Tiktok} className='w-[20px] h-[20px]' alt='tiktok icon' />, url: "#" },
    { icon: <Twitter size={20} />, url: "#" },
    { icon: <Facebook size={20} fill='#274728' className='text-transparent' />, url: "#" }
  ];

  return (
    <footer className="bg-[#274728] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-medium mb-2">Join Our Newsletter</h3>
            <p className="text-white text-sm">Stay up to date with news and updates by subscribing to our newsletter</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-2 rounded-full placeholder:text-[#4B4B4B] text-sm text-black w-full sm:w-64"
            />
            <button className="bg-white text-sm text-[#274728] font-medium px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium mb-4 text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="text-gray-300 hover:text-white transition duration-300 text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex space-x-4 mb-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="bg-white text-[#274728] p-2 rounded-full hover:bg-gray-100 transition duration-300"
                aria-label="Social media link"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <button className="bg-white text-sm text-[#274728] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition duration-300 mb-8">
            <Image src={Whatsapp} className='w-[20px] h-[20px]' alt='whatsapp icon' />
            Join Our Community
            <div className='bg-[#274728] rounded-full p-2'>
              <ArrowUpRight className="text-white h-5 w-5" />
            </div>
          </button>

          <div className="w-full border-t-2 border-white"></div>

          <div className='flex flex-wrap justify-between items-center w-full my-6'>
            <h3 className='text-sm font-medium uppercase mb-4 md:mb-0'>Property of Giddaa Inc.</h3>

            <ul className='flex items-center gap-16 text-sm'>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;