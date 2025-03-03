"use client"

import {
    User, Lock, LogOut,
    MoreVertical
} from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { getUserFromLocalStorage } from '../lib/utils';
import { useRouter } from 'next/navigation';
import Logo from "@/app/assets/Applogo.svg"
import Image from 'next/image';
import Dashboard from "@/app/assets/Dashboard.svg";
import Properties from "@/app/assets/properties.svg";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Sidebar = ({ className }: any) => {

    const user = getUserFromLocalStorage();

    const router = useRouter()

    const logout = () => {
        localStorage.removeItem(
            "access_token");

        localStorage.removeItem(
            "user");

        router.push("/login");
    }

    return (
        <div className={className}>
            {/* Logo */}
            <div className="p-4 border-b border-gray-300">
                <Image src={Logo} alt="logo" />
                <div className="text-xs mt-1 text-green-100">RESIDENCIA MODERNO SMART...</div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-full hover:bg-[#335F32]">
                            <Image src={Dashboard} alt="dashboard icon" />
                            <span className='text-sm'>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/properties" className="ml-4 flex items-center gap-3 p-2 rounded-full bg-white text-[#335F32] font-medium">
                            <Image src={Properties} alt="properties icon" />
                            <span className='text-sm'>Properties</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* User Section */}
            <div className="p-4">
                <div className="flex items-center gap-3 bg-white p-2 rounded-full">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center bg-[#335F32] font-bold">
                        {user?.firstName.split("")[0]}
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-black">{`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}</div>
                        <div className="text-xs text-gray-500">{user?.email ?? ""}</div>
                    </div>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="p-1 rounded-full hover:bg-gray-200 focus:outline-none">
                                    <MoreVertical size={20} color='gray' />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end" className="p-0 bg-white rounded-2xl shadow-lg border border-gray-200">
                                <div className="w-48">
                                    <ul>
                                        <li>
                                            <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                                <User size={16} />
                                                <span>My Profile</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                                <Lock size={16} />
                                                <span>Change Password</span>
                                            </p>
                                        </li>
                                        <li className="w-full" onClick={() => logout()}>
                                            <p className="cursor-pointer flex items-center gap-3 p-3 hover:bg-gray-100 text-red-500">
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
};