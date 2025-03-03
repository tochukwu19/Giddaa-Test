"use client"

import { ProtectedRoute } from '@/app/components/protectedroutes'
import React, { Suspense } from 'react'
import Loading from '../components/loading'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

function CreateLayout({ children }: { children: React.ReactNode }) {
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

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center gap-6">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 flex items-center gap-2 border-2 border-solid border-[#335F32] rounded-md px-2 py-1.5">
                    <ArrowLeft size={18} />
                    <span className="text-[#335F32] text-sm font-medium">Back</span>
                </Link>

                <h1 className="text-sm md:text-2xl spectral-bold-normal text-black">Creating Estate</h1>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-4">
                <span>Estates</span>
                <ChevronRight size={15} />
                <Link href="/create" className='hover:underline'>Create Estate</Link>
            </div>
        </header>
    );
};

export default CreateLayout