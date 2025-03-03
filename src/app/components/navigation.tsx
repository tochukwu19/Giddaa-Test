/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X, DollarSign, User } from 'lucide-react';
import Logo from "@/app/assets/Logo.svg"
import ArrowDown from "@/app/assets/arrow-down.svg"
import Flag from "@/app/assets/Flag.png"
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-300 py-2 w-full text-black">
      <div className="w-[95%] mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Image
                  src={Logo}
                  alt="Logo"
                  className='h-[50px] w-[100px]'
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-start space-x-4">
            <div className="relative w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#274728]" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full text-sm placeholder-gray-400 font-light focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                type="text"
                placeholder="Search for anything"
              />
            </div>
            <NavItem text="Buy" hasDropdown />
            <NavItem text="Shortlets" hasDropdown isActive />
            <NavItem text="Sell" hasDropdown />
            <NavItem text="Invest" hasDropdown />
            <NavItem text="Services" hasDropdown />
            <NavItem text="Enterprise" hasDropdown />
            <NavItem text="Agents & Realtors" />

            <div className="border-l border-[#D9D9D9] h-8 mx-2"></div>

            <button className="text-[#274728] hover:text-green-700 px-3 py-2 text-sm font-medium">
              Refer & Earn
            </button>

            <div className="border-l border-[#D9D9D9] h-8 mx-2"></div>

            <div className="flex items-center ml-3 border rounded-full px-2 py-1">
              <Image
                src={Flag}
                alt="Flag of US"
                className='h-4 w-4'
              />              
              <span className="text-sm font-medium ml-1">USD</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>

            <div className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-gray-200">
              <User size={20} />
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#274728] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 border-t border-gray-200">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              type="text"
              placeholder="Search for anything"
            />
          </div>

          <div className="space-y-1">
            <MobileNavItem text="Buy" />
            <MobileNavItem text="Shortlets" isActive />
            <MobileNavItem text="Sell" />
            <MobileNavItem text="Invest" />
            <MobileNavItem text="Services" />
            <MobileNavItem text="Enterprise" />
            <MobileNavItem text="Agents & Realtors" />
            <MobileNavItem text="Refer & Earn" />

            <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center border rounded-md px-2 py-1">
                <DollarSign className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium ml-1">USD</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
              <div className="ml-auto h-8 w-8 rounded-full flex items-center justify-center border-2 border-gray-200">
                <User />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ text, hasDropdown, isActive }: any) => {
  return (
    <div className="relative">
      <button
        className={`flex items-center gap-2 px-3 py-2 text-sm font-light rounded-md ${isActive
          ? 'text-[#274728]'
          : 'text-[#4B4B4B] hover:text-[#274728]'
          }`}
      >
        {text}
        {hasDropdown && <Image src={ArrowDown} alt='arrow down' className="h-3 w-3" />}
      </button>
      <hr className={`bg-[#274728] w-[30px] mx-auto h-[4px] rounded-full hidden ${isActive ? "!block" : ""}`} />
    </div>
  );
};

const MobileNavItem = ({ text, isActive }: any) => {
  return (
    <a
      href="#"
      className={`block px-3 py-2 text-base font-medium rounded-md ${isActive
        ? 'text-[#274728] bg-green-50'
        : 'text-[#4B4B4B] hover:text-[#274728] hover:bg-green-50'
        }`}
    >
      {text}
    </a>
  );
};

export default Navbar;