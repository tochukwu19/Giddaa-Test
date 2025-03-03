/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { use } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { useFetchData } from '@/app/hooks/useFetchData';


export default function ViewEstatePage({ params }: { params: Promise<any> }) {

    const { id } = use(params)

    const endpoint = `developer/estate/${id}`;

    const {
        data,
        isLoading,
        isError,
        error,
    } = useFetchData('estate-data', endpoint);

    const estateData = data?.value?.value ?? [];

    console.log(estateData)

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-[#335F32] border-t-transparent rounded-full"></div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-red-500 py-4">
                Error loading estate data: {error.message}
            </div>
        )
    }

    return (
        <div className="flex h-auto">
            <div className="flex-1 overflow-auto">
                <main>
                    {/* Estate Information */}
                    <div className="bg-whiteoverflow-hidden">
                        <Tabs defaultValue="details" className="w-full">
                            <div className="border-b border-gray-200">
                                <TabsList className="pt-4 !pb-0 text-gray-500">
                                    <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-[#335F32] data-[state=active]:text-[#335F32] pb-3">
                                        Details
                                    </TabsTrigger>
                                    <TabsTrigger value="properties" className="data-[state=active]:border-b-2 data-[state=active]:border-[#335F32] data-[state=active]:text-[#335F32] pb-3">
                                        Properties
                                    </TabsTrigger>
                                    <TabsTrigger value="allocation" className="data-[state=active]:border-b-2 data-[state=active]:border-[#335F32] data-[state=active]:text-[#335F32] pb-3">
                                        Allocation
                                    </TabsTrigger>
                                    <TabsTrigger value="prospects" className="data-[state=active]:border-b-2 data-[state=active]:border-[#335F32] data-[state=active]:text-[#335F32] pb-3">
                                        Prospects
                                    </TabsTrigger>
                                    <TabsTrigger value="analytics" className="data-[state=active]:border-b-2 data-[state=active]:border-[#335F32] data-[state=active]:text-[#335F32] pb-3">
                                        Analytics
                                    </TabsTrigger>
                                    <TabsTrigger value="activity" className="data-[state=active]:border-b-2 data-[state=active]:border-[#335F32] data-[state=active]:text-[#335F32] pb-3">
                                        Activity
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="details" className="p-6">
                                <div className="flex gap-4 mb-6 flex-col md:flex-row">
                                    {estateData.images.map((image: any) => {
                                        return (
                                            <div key={image.id} className="flex-1 relative">
                                                <Image
                                                    src={image.document}
                                                    alt="Estate Front View"
                                                    width={400}
                                                    height={200}
                                                    className="w-full h-60 object-cover rounded-lg"
                                                />
                                                <div className="absolute bottom-10 left-2 bg-white text-[#335F32] border border-solid border-[#335F32] rounded-full text-xs px-2 py-1 rounded">
                                                    {image.name}
                                                </div>
                                                <div className="absolute bottom-2 left-2 text-white bg-[#335F32] border border-solid border-white rounded-full text-xs px-2 py-1 rounded">
                                                    Actual Image
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <h2 className="text-sm md:text-xl spectral-bold-normal text-black mb-6">Estate Details</h2>

                                <div className="text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                                    <div>
                                        <div className="text-sm font-bold">NAME</div>
                                        <div className="">{estateData.name ?? "nil"}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-bold">STATE</div>
                                        <div className="">{estateData.city.stateId.split("_").join("") ?? "nil"}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-bold">CITY</div>
                                        <div className="">{estateData.city.name ?? "nil"}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-bold">ADDRESS</div>
                                        <div className="">{estateData.address ?? "nil"}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-bold">POPULAR LANDMARK</div>
                                        <div className="">{estateData.landmark === "" ? "nil" : estateData.landmark}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-bold">ESTATE LAND (IN HECTARES)</div>
                                        <div className="">{estateData.landSize ?? "nil"}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-bold">COMPLETION STATUS</div>
                                        <div className="">{estateData.completionStatus ?? "nil"}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm">VIDEO URL</div>
                                        <div className="font-bold text-blue-600">{estateData.videoUrl === "" ? "nil" : estateData.videoUrl}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-bold">NUMBER OF FLOORS</div>
                                        <div className="">{estateData.floors ?? "nil"}</div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="text-sm mb-2 text-black font-bold">DESCRIPTION</div>
                                    <p className="text-black">
                                        {estateData.description ?? ""}
                                    </p>
                                </div>

                                <h2 className="text-sm md:text-xl spectral-bold-normal text-black mt-8 mb-6">Specifications & Amenities</h2>
                            </TabsContent>

                            <TabsContent value="properties">
                                <div className="p-6">
                                    <p className="text-gray-700">Properties content here...</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="allocation">
                                <div className="p-6">
                                    <p className="text-gray-700">Allocation content here...</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="prospects">
                                <div className="p-6">
                                    <p className="text-gray-700">Prospects content here...</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="analytics">
                                <div className="p-6">
                                    <p className="text-gray-700">Analytics content here...</p>
                                </div>
                            </TabsContent><TabsContent value="activity">
                                <div className="p-6">
                                    <p className="text-gray-700">Activity content here...</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    );
}