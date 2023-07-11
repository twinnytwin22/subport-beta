'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function CampaignForm({ close, price }: any) {
    const { watch, register, handleSubmit, formState: { errors } } = useForm();
    const [discountAmount, setDiscountAmount] = useState(0)
    const discountedPrice = price - (price * (discountAmount * 0.01));
    const roundedPrice = Math.round(discountedPrice * 100) / 100;
    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission logic here
    };
    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountAmount(parseFloat(e.target.value));
    };

    return (
        <form className='p-8 space-y-2 text-base' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='font-semibold text-center mb-4 text-xl md:text-2xl'>Create a promotion campaign</h2>

            <legend className="font-bold">Subscriber Type:</legend>
            <ul className="items-center w-full text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg sm:flex dark:bg-zinc-900 dark:border-zinc-700 dark:text-white">
                <li className="w-full border-b border-zinc-200 sm:border-b-0 sm:border-r dark:border-zinc-600">
                    <div className="flex items-center pl-3">
                        <input type="radio" value="new" {...register('subscriberType', { required: true })} className="mr-2" />
                        <label className='w-full py-3 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300'>New</label>
                    </div>
                </li>
                <li className="w-full border-b border-zinc-200 sm:border-b-0 sm:border-r dark:border-zinc-600">
                    <div className="flex items-center pl-3">
                        <input type="radio" value="expired" {...register('subscriberType', { required: true })} className="mr-2" />
                        <label className='w-full py-3 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300'>Expired</label>
                    </div>
                </li>
                <li className="w-full border-b border-zinc-200 sm:border-b-0 dark:border-zinc-600">
                    <div className="flex items-center pl-3">
                        <input type="radio" value="both" {...register('subscriberType', { required: true })} className="mr-2" />
                        <label className='w-full py-3 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300'>Both</label>
                    </div>
                </li>
            </ul>
            {errors.subscriberType && <span className="text-red-500">This field is required</span>}

            <legend className="font-bold">Promotion Type:</legend>
            <ul className="items-center w-full text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg sm:flex dark:bg-zinc-900 dark:border-zinc-700 dark:text-white">
                <li className="w-full border-b border-zinc-200 sm:border-b-0 sm:border-r dark:border-zinc-600">
                    <div className="flex items-center pl-3">
                        <input type="radio" value="freeTrial" {...register('promotionType', { required: true })} className="mr-2" />
                        <label className='w-full py-3 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300'>Free trial</label>
                    </div>
                </li>
                <li className="w-full border-b border-zinc-200 sm:border-b-0 dark:border-zinc-600">
                    <div className="flex items-center pl-3">
                        <input type="radio" value="firstMonthDiscount" {...register('promotionType', { required: true })} className="mr-2" />
                        <label className='w-full py-3 mr-2 text-sm font-medium text-zinc-900 dark:text-zinc-300'>First month discount</label>

                        {watch('promotionType') === 'firstMonthDiscount' && (
                            <div className="flex items-center pl-3 mr-2 ">

                                <input
                                    type='number'
                                    value={discountAmount}
                                    onChange={handleDiscountChange}
                                    placeholder='%'
                                    className='w-10 bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-300 dark:border-zinc-800'
                                />
                                %
                            </div>
                        )}
                        {errors.discountAmount && <span className="text-red-500">This field is required</span>}

                    </div>
                </li>
            </ul>
            {errors.promotionType && <span className="text-red-500">This field is required</span>}

            <h3 className="font-bold mb-2">Offer Details:</h3>
            <div className='flex gap-4 w-full justify-between'>
                <label className="block mb-4 w-full">
                    <span className="font-bold">Redeem limit:</span>
                    <select
                        {...register('offerLimit')}
                        className="block w-full mt-1 p-2 border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 bg-zinc-100 rounded"
                    >
                        <option value="unlimited">Unlimited</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        {/* Add more options for the desired range */}
                    </select>
                </label>

                <label className="block mb-4 w-full">
                    <span className="font-bold">Duration:</span>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        {...register('offerExpiration', { required: true })}
                        className="block w-full mt-1 p-2 border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 bg-zinc-100 rounded"
                    />
                    {errors.offerExpiration && <span className="text-red-500">This field is required</span>}
                </label>
            </div>

            <div className=''>
                {watch('promotionType') === 'freeTrial' && (
                    <>
                        <h3 className="font-bold mt-4 mb-2">Free trial details:</h3>
                        <p>Free trial duration: 7 days</p>
                        <p>Promotional subscription: $0.00 USD for 7 days.</p>
                        <p className='text-xs'>User will not be subscribed for $6.99 automatically, only by choice.</p>
                    </>
                )}
                {watch('promotionType') === 'firstMonthDiscount' && (
                    <>
                        <h3 className="font-bold mt-4 mb-2">First month discount details:</h3>
                        <p>First month duration: 30 days</p>
                        <p>Promotional subscription: ${roundedPrice} USD for first month.</p>
                        <p className='text-xs'>User will not be subscribed for $6.99 automatically, only by choice.</p>
                    </>
                )}
            </div>

            <label className="block mt-4 mb-4">
                <span className="font-bold">Message (optional):</span>
                <textarea
                    {...register('message', { maxLength: 500 })}
                    className="block w-full mt-1 p-2 border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 bg-zinc-100 rounded"
                />
            </label>

            <div className="grid grid-cols-2 gap-4 max-w-xs w-full font-bold text-sm pt-4">
                <button
                    type='button'
                    className="bg-zinc-100 border-zinc-300 border dark:border-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-600 text-center text-black dark:text-white px-4 py-2 rounded relative z-50"
                    onClick={close}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded text-center"
                >
                    Create
                </button>
            </div>
        </form>
    );
}

export default CampaignForm;
