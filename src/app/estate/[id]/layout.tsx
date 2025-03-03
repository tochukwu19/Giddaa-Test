"use client"

import { ProtectedRoute } from '@/app/components/protectedroutes'
import React, { Suspense, useState } from 'react'
import Loading from '@/app/components/loading'
import { ArrowLeft, ChevronRight, MoreVertical, Pencil, QrCode, Share2, Trash, Home } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';


function EstateLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <Suspense fallback={<Loading />}>
                <div className="min-h-screen grid grid-rows-[auto,1fr]">
                    <Header />
                    <div className="overflow-auto bg-white">
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

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
            <div>
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 flex items-center gap-2 border-2 border-solid border-[#335F32] rounded-md px-2 py-1.5">
                        <ArrowLeft size={18} />
                        <span className="text-[#335F32] text-sm font-medium">Back</span>
                    </Link>

                    <h1 className="text-sm md:text-2xl spectral-bold-normal text-black">Estate Name</h1>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-4">
                    <span>Estates</span>
                    <ChevronRight size={15} />
                    <p className='hover:underline'>View Estate</p>
                </div>
            </div>

            <div className='hidden md:flex items-center gap-2'>
                <Link href={"/create"} className="bg-[#335F32] text-sm  text-white px-2 py-1 md:px-4 md:py-2 rounded-full flex items-center gap-2">
                    <Pencil size={16} />
                    <span>Edit Estate</span>
                </Link>

                <TooltipProvider>
                    <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                        <TooltipTrigger asChild onClick={() => setIsOpen(!isOpen)}>
                            <button className="p-1 rounded-full hover:bg-gray-200 focus:outline-none">
                                <MoreVertical size={20} color='gray' />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="end" className="p-0 bg-white rounded-2xl shadow-lg border border-gray-200">
                            <div className="w-48">
                                <ul>
                                    <li>
                                        <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                            <Home size={16} />
                                            <span>Add House</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                            <Share2 size={16} />
                                            <span>Share Estate</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                            <QrCode size={16} />
                                            <span>QR Code</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                            <Trash size={16} />
                                            <span>Delete Estate</span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </header>
    );
};

export default EstateLayout