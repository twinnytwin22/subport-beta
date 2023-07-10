'use client'
import React from 'react';
import { useForm } from 'react-hook-form';

function PromotionForm() {
    const { watch, register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='font-semibold text-center mb-4 text-2xl'>Create a promotion campaign</h2>


            <fieldset className="block mb-4">
                <legend className="text-lg font-bold">Subscriber Type:</legend>
                <div className="flex flex-wrap">
                    <label className="inline-flex items-center mr-4 mb-2">
                        <input type="radio" value="new" {...register('subscriberType', { required: true })} className="mr-2" />
                        <span>New subscribers</span>
                    </label>
                    <label className="inline-flex items-center mr-4 mb-2">
                        <input type="radio" value="expired" {...register('subscriberType', { required: true })} className="mr-2" />
                        <span>Expired subscribers</span>
                    </label>
                    <label className="inline-flex items-center mr-4 mb-2">
                        <input type="radio" value="both" {...register('subscriberType', { required: true })} className="mr-2" />
                        <span>Both new and expired</span>
                    </label>
                </div>
                {errors.subscriberType && <span className="text-red-500">This field is required</span>}
            </fieldset>


            <fieldset className="block mb-4">
                <legend className="text-lg font-bold">Promotion Type:</legend>
                <div className="flex flex-wrap">
                    <label className="inline-flex items-center mr-4 mb-2">
                        <input type="radio" value="freeTrial" {...register('promotionType', { required: true })} className="mr-2" />
                        <span>Free trial</span>
                    </label>
                    <label className="inline-flex items-center mr-4 mb-2">
                        <input type="radio" value="firstMonthDiscount" {...register('promotionType', { required: true })} className="mr-2" />
                        <span>First month discount</span>
                    </label>
                </div>
                {errors.promotionType && <span className="text-red-500">This field is required</span>}
            </fieldset>


            <h3 className="text-lg font-bold mb-2">Offer Details:</h3>
            <div className='flex gap-4 w-full justify-between'>
                <label className="block mb-4 w-full">
                    <span className="text-lg font-bold">Offer limit:</span>
                    <select
                        {...register('offerLimit')}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded"
                    >
                        <option value="unlimited">Unlimited</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        {/* Add more options for the desired range */}
                    </select>
                </label>

                <label className="block mb-4 w-full">
                    <span className="text-lg font-bold">Offer expiration:</span>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        {...register('offerExpiration', { required: true })}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                    {errors.offerExpiration && <span className="text-red-500">This field is required</span>}
                </label>

            </div>
            <div className=''>
                {watch('promotionType') === 'freeTrial' && (
                    <>
                        <h3 className="text-lg font-bold mt-4 mb-2">Free trial details:</h3>
                        <p>Free trial duration: 7 days</p>
                        <p>Promotional subscription: $0.00 USD for 7 days.</p>
                        <p className='text-xs'>User will not be subscribed for $6.99 automatically, only by choice.</p>
                    </>
                )}
            </div>
            <label className="block mt-4 mb-4">
                <span className="text-lg font-bold">Message (optional):</span>
                <textarea {...register('message', { maxLength: 500 })} className="block w-full mt-1 p-2 border border-gray-300 rounded" />
            </label>

            <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-600 dark:bg-blue-700  hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded w-full text-center">Start Campaign</button>
            </div>
        </form>
    );
}

export default PromotionForm;
