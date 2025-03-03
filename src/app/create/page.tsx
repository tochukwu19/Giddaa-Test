/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Plus, X
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/app/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFetchData } from '../hooks/useFetchData';
import { useMutateData } from '../hooks/useMutateData';
import { useToast } from '../components/ui/toast/Toast';
import SmallLoader from '../components/ui/loader';
import { useRouter } from 'next/navigation';


const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    state: yup.string().required('State is required'),
    cityId: yup.string().required('City is required'),
    address: yup.string().required('Address is required'),
    landmark: yup.string(),
    landSize: yup.number().positive('Landsize must be positive'),
    completionStatus: yup.string().required('Completion status is required'),
    videoUrl: yup.string().url('Please enter a valid URL').nullable(),
    floors: yup.number().positive('Number of floors must be positive').nullable(),
    description: yup.string().required('Description is required'),
});

type Image = {
    file: File;
    id: number;
    name: string;
    src: string;
};

interface EstateImage {
    id: string;
    name: string;
    file: File;
    src: string;
    base64: string;
    extension: string;
}

type FormData = yup.InferType<typeof schema>;

export default function CreateEstatePage() {
    const [estateImages, setEstateImages] = useState<any>([]);
    const [stateId, setStateId] = useState('');
      const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            state: '',
            cityId: '',
            address: '',
            landmark: '',
            landSize: 0,
            completionStatus: '',
            videoUrl: '',
            floors: 0,
            description: '',
        }
    });

    // Image operations
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const newImagesPromises = files.map(async (file: File) => {
            const base64 = await convertToBase64(file);

            const extension = file.name.split('.').pop() || '';

            return {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: file.name,
                file,
                src: URL.createObjectURL(file),
                base64,
                extension
            };
        });

        const newImages = await Promise.all(newImagesPromises);
        setEstateImages((prev: EstateImage[]) => [...prev, ...newImages]);
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                const base64String = result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const prepareImageData = (image: EstateImage, estateId: string) => {
        return {
            base64: image.base64,
            ownerId: estateId,
            optionId: "ESTATE_IMAGE",
            type: "ACTUAL_IMAGE",
            extension: image.extension,
            description: image.name,
            name: image.name,
            extraProperties: null,
            revisionId: null
        };
    };

    // Mutations
    const {
        data: statesData,
        isLoading: statesLoading,
        isError: statesError
    } = useFetchData('states', `/public/state/NIGERIA/get-all`);

    const {
        data: citiesData,
        isLoading: citiesLoading,
        isError: citiesError
    } = useFetchData('cities', `/public/city/${stateId}/get-all`, stateId !== "");

    const states = statesData?.value?.value?.data;

    const cities = citiesData?.value?.value?.data;

    const { mutate, isPending } = useMutateData("estate");

    const { mutate: imageMutate, isPending: isImageMutationPending } = useMutateData("estate-images");

    const { toast } = useToast();

    const onSubmit = (data: FormData) => {
        console.log('Form Data:', data);
        console.log('Images:', estateImages);

        // Convert images to the required payload format
        const imagesPayload = (estateId: string) => {
            
            return estateImages.map((image: any) =>
            prepareImageData(image, estateId)
        )};

        mutate(
            { endpoint: "developer/estate/create", payload: { ...data, ownerType: "DEVELOPER" } },
            {
                onSuccess: (res) => {
                    toast({ title: "Success", message: res.value.message || "Estate created successfully", type: "success" })

                    console.log(res, "created response")

                    imageMutate(
                        { endpoint: `/developer/estate/${res?.value?.value?.id}/upload-document`, payload: 
                        // Calling first image because endpoint doesn't accomodate multiple (and mapping mutations is not ideal)
                        imagesPayload(res?.value?.value?.id)[0] },
                        {
                            onSuccess: (res) => {
                                toast({ title: "Success", message: res.value.message || "Estate images created successfully", type: "success" })

                                router.push("/dashboard")
                            },
                            onError: (error: any) => {
                                toast({ title: "Error", message: error?.response?.data.value.message || "Failed to create estate images", type: "error" })
                            },
                        }
                    );
                },
                onError: (error: any) => {
                    toast({ title: "Error", message: error?.response?.data.value.message || "Failed to create estate", type: "error" })
                },
            }
        );
    };

    const removeImage = (id: number) => {
        setEstateImages((prev: any) => prev.filter((image: Image) => image.id !== id));
    };

    return (
        <div className="flex h-auto">
            <div className="flex-1 overflow-auto">
                <main className="p-6">
                    <div className="bg-white overflow-hidden">
                        <form onSubmit={handleSubmit(onSubmit)} className='text-black'>
                            {/* Image Upload Section */}
                            <div className="border-b border-gray-100 p-6">
                                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer" onClick={() => document.getElementById('image-upload')?.click()}>
                                    <div className="bg-green-700 w-10 h-10 rounded-md flex items-center justify-center mb-2">
                                        <Plus className="text-white" size={24} />
                                    </div>
                                    <div className="text-sm text-center font-medium text-gray-600">ADD ESTATE IMAGES</div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </div>

                                <div className="mt-6 flex gap-4 flex-wrap">
                                    {estateImages.map((image: Image) => (
                                        <div key={image.id} className="relative">
                                            <Image
                                                src={image.src}
                                                alt={image.name}
                                                width={100}
                                                height={75}
                                                className="w-24 h-16 object-cover rounded-md border border-gray-200"
                                            />
                                            <div className="absolute -top-2 -right-2 flex">
                                                <button
                                                    type="button"
                                                    className="bg-white w-5 h-5 rounded-full flex items-center justify-center border border-gray-200 shadow-sm"
                                                    onClick={() => removeImage(image.id)}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                            <div className="text-xs mt-1 text-center text-gray-600 w-24 truncate">{image.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                                            placeholder="Estate name"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State<span className="text-red-500">*</span>
                                        </label>
                                        <Controller
                                            name="state"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={(value) => {
                                                        setStateId(value);
                                                        field.onChange(value);

                                                        setValue('cityId', '');
                                                    }}
                                                    defaultValue={field.value}
                                                    disabled={statesLoading}
                                                >
                                                    <SelectTrigger className={`w-full !py-[10px] ${errors.state ? 'border-red-500' : ''}`}>
                                                        <SelectValue placeholder={statesLoading ? "Loading states..." : "Select state"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statesError ? (
                                                            <SelectItem value="" disabled>Error loading states</SelectItem>
                                                        ) : (
                                                            states?.map((state: any) => (
                                                                <SelectItem key={state.id} value={state.id}>
                                                                    {state.name}
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City<span className="text-red-500">*</span>
                                        </label>
                                        <Controller
                                            name="cityId"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    disabled={citiesLoading || !stateId}
                                                >
                                                    <SelectTrigger className={`w-full !py-[10px] ${errors.cityId ? 'border-red-500' : ''}`}>
                                                        <SelectValue placeholder={
                                                            !stateId
                                                                ? "Select state first"
                                                                : citiesLoading
                                                                    ? "Loading cities..."
                                                                    : "Select city"
                                                        } />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {citiesError ? (
                                                            <SelectItem value="error-loading" disabled>Error loading cities</SelectItem>
                                                        ) : !stateId ? (
                                                            <SelectItem value="select-state-first" disabled>Select a state first</SelectItem>
                                                        ) : (
                                                            cities?.map((city: any) => (
                                                                <SelectItem key={city.id} value={city.id}>
                                                                    {city.name}
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.cityId && <p className="text-red-500 text-xs mt-1">{errors.cityId.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register('address')}
                                            type="text"
                                            className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                                            placeholder="Estate address"
                                        />
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Popular Landmark
                                        </label>
                                        <input
                                            {...register('landmark')}
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                            placeholder="Nearby landmark"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Estate Land (in Hectares)
                                        </label>
                                        <input
                                            {...register('landSize')}
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                            placeholder="Land size"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Completion Status<span className="text-red-500">*</span>
                                        </label>
                                        <Controller
                                            name="completionStatus"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className={`w-full !py-[10px] ${errors.completionStatus ? 'border-red-500' : ''}`}>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="COMPLETED">Completed</SelectItem>
                                                        <SelectItem value="UNDER_CONSTRUCTION">Ongoing</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.completionStatus && <p className="text-red-500 text-xs mt-1">{errors.completionStatus.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Video URL
                                        </label>
                                        <input
                                            {...register('videoUrl')}
                                            type="text"
                                            className={`w-full p-2 border ${errors.videoUrl ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                                            placeholder="Add a YouTube Video Link"
                                        />
                                        {errors.videoUrl && <p className="text-red-500 text-xs mt-1">{errors.videoUrl.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Number of Floors
                                        </label>
                                        <input
                                            {...register('floors')}
                                            type="number"
                                            className={`w-full p-2 border ${errors.floors ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
                                            placeholder="4"
                                        />
                                        {errors.floors && <p className="text-red-500 text-xs mt-1">{errors.floors.message}</p>}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description<span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 h-32`}
                                        placeholder="Enter estate description..."
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                                </div>

                                <div className="pl-0 lg:pl-[16.5rem] py-4 fixed left-0 bottom-0 bg-gray-100 w-full mt-6 flex justify-center gap-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 text-sm rounded-full text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#335F32] text-sm text-white rounded-full"
                                        disabled={isPending || isImageMutationPending || estateImages.length === 0}
                                    >
                                        {isPending || isImageMutationPending ? <SmallLoader /> : "Create Estate"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}