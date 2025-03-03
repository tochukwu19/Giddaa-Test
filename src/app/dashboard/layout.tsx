/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ProtectedRoute } from '@/app/components/protectedroutes'
import React, { Suspense, useState } from 'react'
import Loading from '../components/loading'
import {
    Home,
    Search, Bell,
    Clock,
    Send,
    ChevronDown
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Play from "@/app/assets/play.svg"
import Pressplay from "@/app/assets/pressplay.svg"
import Tour from "@/app/assets/tour.svg"
import Image from 'next/image';



function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <Suspense fallback={<Loading />}>
                <div className="min-h-screen grid grid-rows-[auto,1fr]">
                    <Header />
                    <div className="overflow-auto bg-gray-100">
                        <main className="p-6">{children}</main>
                    </div>
                </div>
            </Suspense>
        </ProtectedRoute>
    )
}

// Header Component
const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentSearch = searchParams.get('search') || '';
    const [searchValue, setSearchValue] = useState(currentSearch);

    const updateSearchParams = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        router.push(`${pathname}?${params.toString()}`);
    }

    const handleSearchChange = (e: any) => {
        const value = e.target.value;
        setSearchValue(value);
        updateSearchParams(value);
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex items-center space-x-1 mr-4">
                        <Link href="/estates" className="text-gray-600 hover:text-gray-900">
                            <Home size={16} />
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-sm md:text-base spectral-bold text-black">My Properties</span>
                    </div>
                </div>

                <div className="relative w-1/3">
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-full">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search for anything..."
                            className="placeholder:text-sm text-black bg-transparent border-none outline-none text-sm w-full"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="md:flex items-center gap-4 hidden">
                    <TooltipProvider>
                        <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                            <TooltipTrigger asChild onClick={() => setIsOpen(!isOpen)}>
                                <button className="p-1 rounded-full text-xs bg-gray-200 text-[#335F32] px-8 py-2 hover:bg-gray-100 focus:outline-none flex items-center gap-2">
                                    <Image src={Play} alt="presentation" />
                                    How It Works
                                    <ChevronDown size={15} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end" className="p-0 bg-white rounded-2xl shadow-lg border border-gray-200">
                                <div className="w-48">
                                    <ul>
                                        <li>
                                            <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700 text-xs">
                                                <Image src={Tour} alt="Tour" />
                                                <span>Product Tour & Guide</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700 text-xs">
                                                <Image src={Pressplay} alt="Pressplay" />
                                                <span>Video Tutorial</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <button className="text-[#335F32] hover:text-gray-900 relative bg-gray-200 rounded-full p-2">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
                    </button>

                    <button className="text-[#335F32] hover:text-gray-900 bg-gray-200 rounded-full p-2">
                        <Clock size={20} />
                    </button>

                    <button className="text-[#335F32] hover:text-gray-900 bg-gray-200 rounded-full p-2">
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardLayout