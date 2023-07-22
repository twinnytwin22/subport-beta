'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaDollarSign, FaEthereum } from 'react-icons/fa';

function SubscriberForm({ close, sub, isAuthedUser }: any) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // const [paymentMethod, setPaymentMethod] = useState('');
    const pricePerMonth = sub?.price_per_month;
    const [selectedBundle, setSelectedBundle] = useState<any>(null);

    const handleSubscriptionBundleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBundle(e.target.value);

    };
    const handleNullBundles = () => {
        setSelectedBundle(null)
    }
    const getTotalPrice = () => {
        if (selectedBundle) {
            const tier = subscriptionTiers.find((tier) => tier.months === parseInt(selectedBundle));
            if (tier) {
                return parseFloat(tier.price).toFixed(2);
            }
        }
        return pricePerMonth.toFixed(2);
    };

    const onSubmit = async (data: any) => {
        // Handle success or error
    };

    const subscriptionTiers = [
        { months: 3, price: (pricePerMonth * 3 * 0.8).toFixed(2), discount: '20% off', active: sub.tier_1 },
        { months: 6, price: (pricePerMonth * 6 * 0.75).toFixed(2), discount: '25% off', active: sub.tier_2 },
        { months: 12, price: (pricePerMonth * 12 * 0.65).toFixed(2), discount: '35% off', active: sub.tier_3 }
    ];

    return (
        <div className="bg-white dark:bg-black p-8 rounded-lg shadow-lg border-zinc-200 dark:border-zinc-700 border max-w-md  w-96 scale-90 md:scale-100 z-[9999] isolate mx-auto">
            <p className=' cursor-pointer absolute p-2 border dark:border-zinc-800 border-zinc-200 rounded text-sm' onClick={close}>Close</p>
            <h1 className="text-center text-xl text-black dark:text-white">{isAuthedUser ? 'Your Subscription' : 'Subscribe Now'}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <h3 className="mb-2 font-bold text-zinc-900 dark:text-white">{isAuthedUser ? 'Accepted payments' : 'Pay via'}</h3>
                <ul className="items-center w-full text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg sm:flex dark:bg-zinc-900 dark:border-zinc-700 dark:text-white">
                    <li className="w-full border-b border-zinc-200 sm:border-b-0 sm:border-r dark:border-zinc-600">
                        <div className="flex items-center pl-3">
                            <input
                                disabled={isAuthedUser}
                                {...register('paymentMethod', { required: 'Payment method is required' })}
                                type="radio"
                                id="crypto"
                                value="crypto"
                                className={`w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded  dark:ring-offset-zinc-700 dark:focus:ring-offset-zinc-700 focus:ring-2 dark:bg-zinc-600 dark:border-zinc-700 ${errors.paymentMethod ? 'border-red-500' : 'border-zinc-300'
                                    }`}
                            />
                            <label htmlFor="crypto" className="w-full py-3 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                                Crypto
                            </label>
                            <FaEthereum className='mr-4' />
                        </div>
                    </li>

                    <li className="w-full border-b border-zinc-200 sm:border-b-0  dark:border-zinc-600">
                        <div className="flex items-center pl-3">
                            <input
                                disabled={isAuthedUser}
                                {...register('paymentMethod', { required: 'Payment method is required' })}
                                type="radio"
                                id="cash"
                                value="cash"
                                className={`w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded  dark:ring-offset-zinc-700 dark:focus:ring-offset-zinc-700 focus:ring-2 dark:bg-zinc-600 dark:border-zinc-700 ${errors.paymentMethod ? 'border-red-500' : 'border-zinc-300'
                                    }`}
                            />
                            <label htmlFor="cash" className="w-full py-3 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                                Cash
                            </label>
                            <FaDollarSign className='mr-4' />
                        </div>
                    </li>
                </ul>

                {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod.message?.toString()}</p>}

                <div className="space-x-2 flex">
                    <label className="font-bold" htmlFor="pricePerMonth">Price per month</label>
                    <p>${pricePerMonth}</p>
                    {errors.pricePerMonth && <p className="text-red-500">{errors.pricePerMonth.message?.toString()}</p>}
                </div>

                {/* Add the CampaignModal component here */}

                <div className="space-y-2">
                    <label className="font-bold">Subscription Bundle</label>
                    <ul className="space-y-2">
                        {selectedBundle &&

                            <li>
                                <button type='button'
                                    {...register('subscriptionBundle')}
                                    onClick={handleNullBundles}>Clear</button>

                            </li>}
                        {subscriptionTiers.filter((tier) => tier.active) // Filter out inactive tiers
                            .map((tier) => (
                                <li key={tier.months} className="flex items-center">
                                    <input
                                        disabled={isAuthedUser}
                                        type="radio"
                                        id={`tier-${tier.months}`}
                                        {...register('subscriptionBundle')}
                                        value={tier.months}
                                        className="hidden peer"
                                        onChange={handleSubscriptionBundleChange}
                                    />
                                    <label
                                        htmlFor={`tier-${tier.months}`}
                                        className="inline-flex items-center justify-between w-full p-2.5 text-zinc-700 bg-white border border-zinc-200 rounded-lg cursor-pointer dark:hover:text-zinc-300 dark:border-zinc-700 peer-checked:border-blue-600 hover:text-zinc-600 dark:peer-checked:text-zinc-300 peer-checked:text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                                    >
                                        <div>{tier.discount}</div>
                                        <div className="block text-right">
                                            <div className="w-full text-lg font-semibold">{tier.months} months</div>
                                            <div className="w-full text-sm">${tier.price}</div>
                                        </div>
                                    </label>
                                </li>
                            ))}
                    </ul>
                </div>
                {!isAuthedUser ? (
                    <div className='flex items-center space-x-2'>
                        <button
                            type="submit"
                            className="bg-blue-600 text-sm dark:bg-blue-700 text-center hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Subscribe Now
                        </button>
                        <div className="flex items-center space-x-2">
                            <label className="font-bold" htmlFor="totalPrice">Total Price:</label>
                            <p>${getTotalPrice()}</p>
                        </div>
                    </div>
                ) : (
                    <p className='text-center text-green-700 font-bold'>Your subscription is live</p>
                )}
            </form>

            {/* Add the success modal */}
        </div>
    );
}

export default SubscriberForm;
