"use client";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEventFormStore } from "./EventFormStore";
import { useStorageUpload } from "@thirdweb-dev/react";
import { renderProgressBar } from "ui/Misc/ProgressBar";
import { useRouter } from "next/navigation";
import { GoogleMapSearch } from "ui/Misc/maps/GoogleMapSearch";
import MyGoogleMap from "ui/Misc/maps/Map";
import { useAuthProvider } from "app/context/auth";
import { toast } from "react-toastify";

type EventFormData = {
    image: string;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    ticket_type: string;
    price: string;
    currency_type: string;
    ticket_quantity: number;
    ticket_status: string;
    ticket_terms: string;
};

type FormSubmitHandler = SubmitHandler<EventFormData>;

const IRLEventCreationForm = () => {
    const { user } = useAuthProvider();
    const inputRef = useRef<any>();
    const router = useRouter();
    const {
        setImagePreview,
        progress,
        total,
        imagePreview,
        setProgress,
        setTotal,
        isUploading,
        setUploading,
        setInProgress,
        logImage,
        setIpfsMedia,
        setImageUrl,
        imageUrl,
    } = useEventFormStore();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<EventFormData>({
        defaultValues: {
            image: "",
            title: "" || undefined,
            description: "" || undefined,
            date: "" || undefined,
            location: "" || undefined,
            category: "" || undefined,
            ticket_type: "" || undefined,
            price: "" || undefined,
            currency_type: "" || undefined,
            ticket_quantity: "" || undefined,
            ticket_status: "" || undefined,
            ticket_terms: "" || undefined,
        },
    });
    const { mutateAsync: upload } = useStorageUpload({
        uploadWithoutDirectory: true,
        onProgress: (progress) => {
            setProgress(progress?.progress); // Update the progress state
            setTotal(progress?.total); // Update the progress state
        },
    });

    const startUpload = async (image: any) => {
        setUploading(true);
        try {
            if (image) {
                setInProgress("image");
                const imageUri = await upload({ data: [image] });
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setImageUrl(imageUri[0]);
                logImage();
                setInProgress("");
                setProgress(100);
                setTotal(100);
            }
        } catch (error) {
            throw error;
            // Handle the error here if needed
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIpfsMedia(true);
            return imageUrl;
        }
    };

    const onSubmit: FormSubmitHandler = async (data: any) => {
        const getSlug = data?.title; // + '-' + data?.name;
        let slug: string = getSlug.toLowerCase().replace(/[^a-zA-Z0-9-]+/g, "-");
        setUploading(true);
        if (data.image) {
            const uploadPromise = startUpload(data.image);

            toast.promise(
                uploadPromise, {
                pending: 'Uploading Event...',
                success: 'Event Uploaded',
                error: 'Error Uploading Event'
            }
            )

            await uploadPromise
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const uploadedImage = useEventFormStore.getState().imageUrl!;
            const eventData = {
                ...data,
                image: uploadedImage,
                slug: slug,
                user_id: user.id!,
            };

            const fetchRes = fetch("/api/v1/createIRLEvent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventData }),
            });

            toast.promise(
                fetchRes, {
                pending: 'Finalizing event...',
                success: 'Event finalized!',
                error: 'Error finalizing event...'
            }
            )

            const fetchedData = await (await fetchRes).json();

            setUploading(false);
            setProgress(0);
            setTotal(0);
            const redirectPromise = new Promise((resolve) => setTimeout(resolve, 1000));
            toast.promise(redirectPromise, {
                pending: 'Redirecting you to your event...'
            })
            await redirectPromise

            if (fetchedData?.status === "success") {
                router.push(`/events/${eventData.slug}`);
            }

            if (fetchedData.error) {
                throw fetchedData.error;
            }
            setImageUrl("");
        }
    };
    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            // Read the selected file and create a preview URL
            const reader = new FileReader();
            reader.onload = (event: any) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);

            // Update the "audio" field value in the form data
            setValue("image", file);
        } else {
            // Clear the preview and the "audio" field value if the file was removed
            setImagePreview("");
            setValue("image", "");
        }
    };
    return (
        <>
            <h1 className="text-center text-2xl font-bold text-black dark:text-white">
                Create your event.
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-6xl mx-auto w-full mb-24 mt-8 justify-between py-4"
            >
                {isUploading && renderProgressBar(progress, total)}

                <div className="flex mx-auto w-full gap-4 justify-around">
                    <div className="w-full max-w-md">
                        {/* Event Details */}
                        <div className="mb-4 w-full grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Event Title:</label>
                                <input
                                    id="title"
                                    {...register("title", { required: true })}
                                    type="text"
                                    placeholder="Event Title"
                                    required
                                    className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Event Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    id="date"
                                    {...register("date", { required: true })}
                                    required
                                    className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Event Description:</label>
                            <textarea
                                placeholder="Your event description"
                                id="description"
                                {...register("description", { required: true })}
                                required
                                className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">
                                Event Location (Physical or Virtual):
                            </label>

                            <GoogleMapSearch>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    id="location"
                                    {...register("location", { required: true })}
                                    required
                                    className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </GoogleMapSearch>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Event Category/Type:</label>
                            <input
                                type="text"
                                placeholder="Event Category/Type"
                                id="category"
                                {...register("category", { required: true })}
                                required
                                className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        {/* Ticket Information */}
                        <div className="mb-4 w-full grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Ticket Types:</label>
                                <input
                                    type="text"
                                    placeholder="Ticket Type?"
                                    id="ticket_type"
                                    {...register("ticket_type", { required: true })}
                                    required
                                    className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Ticket Prices:</label>
                                <input
                                    type="text"
                                    id="price"
                                    placeholder="Ticket price?"
                                    {...register("price", { required: true })}
                                    required
                                    className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mb-4 w-full grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Ticket Currency Options:</label>
                                <input
                                    type="text"
                                    placeholder="Currency Type"
                                    id="currency_type"
                                    {...register("currency_type", { required: true })}
                                    required
                                    className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">
                                    Ticket Quantity (if limited):
                                </label>
                                <input
                                    type="number"
                                    placeholder="Quantity?"
                                    id="ticket_quantity"
                                    {...register("ticket_quantity", { required: true })}
                                    className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Ticket Availability Status:</label>
                            <select
                                placeholder="Ticket Status"
                                id="ticket_status"
                                {...register("ticket_status", { required: true })}
                                required
                                className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="On Sale">On Sale</option>
                                <option value="Sold Out">Sold Out</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Ticket Terms and Conditions:</label>
                            <textarea
                                id="ticket_terms"
                                placeholder="Ticket Terms"
                                {...register("ticket_terms", { required: true })}
                                required
                                className="bg-zinc-50 border border-zinc-300  text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-4 w-full min-w-md">
                            {!imagePreview && (
                                <label
                                    htmlFor="file"
                                    className="flex flex-col items-center justify-center w-72 h-72 md:w-96 md:h-96 border-2 border-zinc-300 border-dashed rounded-md cursor-pointer bg-zinc-50 dark:hover:bg-bray-800 dark:bg-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-zinc-800 dark:hover:bg-zinc-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            aria-hidden="true"
                                            className="w-10 h-10 mb-3 text-zinc-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                                            <span className="font-semibold">
                                                Click to upload artwork
                                            </span>
                                        </p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            PNG, JPG or GIF (MAX.50MB)
                                        </p>
                                    </div>
                                    <input
                                        accept="image/*"
                                        id="file"
                                        type="file"
                                        className="hidden"
                                        {...register("image")}
                                        onChange={handleImageUpload}
                                        required
                                    />
                                </label>
                            )}
                            {imagePreview ? (
                                <img
                                    className="w-96 rounded-md"
                                    src={imagePreview}
                                    alt="preview"
                                />
                            ) : null}
                        </div>
                        <MyGoogleMap />

                        <div>
                            <p>Title:&#160;{watch("title")}</p>

                            <p>Location:&#160;{watch("location")}</p>
                        </div>
                        {/* Submit button */}
                        <div className="w-full justify-end flex">
                            <button
                                type="submit"
                                className="bg-blue-600 text-sm dark:bg-blue-700 text-center hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default IRLEventCreationForm;
