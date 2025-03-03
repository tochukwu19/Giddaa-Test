/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, Home, MoreHorizontal, Pencil, Plus, Trash } from 'lucide-react';
import { useFetchData } from '../hooks/useFetchData';
import Image from 'next/image';
import Placeholder from "@/app/assets/image-placeholder.svg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { debounce } from "lodash";
import Pagination from '../components/ui/pagination';
import Link from 'next/link';


export default function EstatesDashboard() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [isReloading, setIsReloading] = useState(false)
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

    const endpoint = `/developer/estate/get-all?pageNumber=${currentPage}&pageSize=${pageSize}${searchQuery ? `&search=${searchQuery}` : ''}`;

    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData('estates', endpoint);

    const estatesData = data?.value?.value?.data ?? [];

    const debounceSearch = useMemo(
        () =>
            debounce((query) => {
                setDebouncedSearch(query);
            }, 500),
        []
    );

    useEffect(() => {
        debounceSearch(searchQuery);
    }, [searchQuery, debounceSearch]);

    useEffect(() => {
        setIsReloading(true);
        refetch().finally(() => setIsReloading(false));
    }, [debouncedSearch, currentPage, refetch]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginationData = data?.value?.value ? {
        pageNumber: data?.value?.value.pageNumber || currentPage,
        pageSize: data?.value?.value.pageSize || pageSize,
        totalPages: data?.value?.value.totalPages || 1,
        totalRecords: data?.value?.value.totalRecords || 0
    } : {
        pageNumber: currentPage,
        pageSize: pageSize,
        totalPages: 1,
        totalRecords: 0
    };


    return (
        <main>
            <div className="flex justify-between items-center mb-6 flex-wrap">
                <h1 className="text-base md:text-2xl spectral-bold-normal text-black">
                    Estates - {data?.value.value.totalRecords || 0}
                </h1>
                <Link href={"/create"} className="bg-[#335F32] text-sm md:text-base text-white px-2 py-1 md:px-4 md:py-2 rounded-full flex items-center gap-2">
                    <Plus size={18} />
                    <span>Create Estate</span>
                </Link>
            </div>

            {isLoading || isReloading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-[#335F32] border-t-transparent rounded-full"></div>
                </div>
            ) : isError ? (
                <div className="text-red-500 py-4">
                    Error loading estates: {error.message}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {estatesData?.length > 0 ? (
                            estatesData.map((estate: any) => (
                                <EstateCard key={estate.id} estate={estate} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No estates found. {searchQuery && 'Try a different search query.'}
                            </div>
                        )}
                    </div>

                    <Pagination
                        pageNumber={paginationData.pageNumber}
                        pageSize={paginationData.pageSize}
                        totalPages={paginationData.totalPages}
                        totalRecords={paginationData.totalRecords}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </main>
    );
}

const EstateCard = ({ estate }: { estate: any }) => {
    const imageSrc =
        estate?.images?.[0]?.document?.endsWith(".webp")
            ? Placeholder
            : estate?.images?.[0]?.document || Placeholder;

    const truncateWords = (text: string, wordLimit: number) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    };

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="relative">
                <Image
                    src={imageSrc}
                    alt={estate?.name || "Estate"}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-green-100 text-xs px-2 py-1 rounded-full border-2 border-solid border-[#335F32] text-[#335F32]">
                    {estate?.houseStats?.totalHouses ?? 0} houses
                </div>
            </div>

            <div className="p-4 text-center">
                <Link href={`/estate/${estate.id}`} className="font-medium text-black">{estate.name ?? "Unnamed Estate"}</Link>
                <p className="text-xs text-gray-500 mt-1 text-wrap">
                    {truncateWords(estate.address ?? "No location", 15)}
                </p>

                <div className="flex justify-end mt-4">
                    <TooltipProvider>
                        <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                            <TooltipTrigger asChild onClick={() => setIsOpen(!isOpen)}>
                                <button className="text-gray-400 hover:text-gray-600 bg-gray-200 rounded-full p-1">
                                    <MoreHorizontal size={15} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end" className="p-0 bg-white rounded-2xl shadow-lg border border-gray-200">
                                <div className="w-48">
                                    <ul>
                                        <li>
                                            <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                                <Eye size={16} />
                                                <span>View House</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                                <Pencil size={16} />
                                                <span>Edit Estate</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-gray-700">
                                                <Home size={18} />
                                                <span>Add House</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p className="flex items-center gap-3 p-3 hover:bg-gray-100 text-red-700">
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
            </div>
        </div>
    );
};

