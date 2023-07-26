'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient, } from '@tanstack/react-query';
import CampaignModal from './CampaignModal';
import { FaDollarSign, FaEthereum } from 'react-icons/fa';
import { createSubscription } from 'utils/database';
import { useAuthProvider } from 'app/context/auth';
import Link from 'next/link';

function SubscriptionForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [pricePerMonth, setPricePerMonth] = useState(4.99);
    const { profile } = useAuthProvider()
    const subscriptionUrl = `/${profile?.username}`

    const handleCampaignModal = () => setModalOpen(true);

    const onSubmit = async (data: any) => {
        await createSubscription(data, profile?.id);
        setSuccessModalOpen(true);
        queryClient.invalidateQueries(['subscriptionTiers']);
    };

    const subscriptionTiers = [
        { months: 3, price: (pricePerMonth * 3 * .80).toFixed(2), discount: '20% off' },
        { months: 6, price: (pricePerMonth * 6 * .75).toFixed(2), discount: '25% off' },
        { months: 12, price: (pricePerMonth * 12 * .65).toFixed(2), discount: '35% off' }
    ];

    return (
        <div className="max-w-md mx-auto space-y-8 mb-24 ">
            <h1 className="text-center text-2xl font-bold text-black dark:text-white">Create your subscription.</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="mb-2 font-bold text-zinc-900 dark:text-white">Accept Payments via</h3>
                <ul className="items-center w-full text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg sm:flex dark:bg-zinc-900 dark:border-zinc-700 dark:text-white">
                    <li className="w-full border-b border-zinc-200 sm:border-b-0 sm:border-r dark:border-zinc-600">
                        <div className="flex items-center pl-3">
                            <input
                                {...register('paymentMethod', { required: 'Payment method is required' })}
                                type="checkbox"
                                id="crypto"
                                value="crypto"
                                className={`w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-700 dark:focus:ring-offset-zinc-700 focus:ring-2 dark:bg-zinc-600 dark:border-zinc-700 ${errors.paymentMethod ? 'border-red-500' : 'border-zinc-300'
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
                                {...register('paymentMethod', { required: 'Payment method is required' })}
                                type="checkbox"
                                id="cash"
                                value="cash"
                                className={`w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-700 dark:focus:ring-offset-zinc-700 focus:ring-2 dark:bg-zinc-600 dark:border-zinc-700 ${errors.paymentMethod ? 'border-red-500' : 'border-zinc-300'
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

                <div className='space-y-2'>
                    <label className='font-bold' htmlFor="pricePerMonth">Price per month</label>
                    <input
                        {...register('pricePerMonth', { required: 'Price per month is required', min: { value: 4.99, message: 'Minimum price per month is $4.99' } })}
                        type="number"
                        id="pricePerMonth"
                        step="0.01"
                        className={`border ${errors.pricePerMonth ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 bg-white'} px-3 py-2 rounded w-full`}
                        value={pricePerMonth}
                        onChange={(e) => setPricePerMonth(parseFloat(e.target.value))}
                    />
                    {errors.pricePerMonth && <p className="text-red-500">{errors.pricePerMonth.message?.toString()}</p>}
                </div>
                <div>
                    <div onClick={handleCampaignModal}
                        className="bg-blue-600 dark:bg-blue-700 text-sm text-center hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Create Promotion Campaign
                    </div>
                </div>
                <div className='space-y-2'>
                    <label className='font-bold'>Subscription Bundle</label>
                    <ul className="space-y-2">
                        {subscriptionTiers.map((tier) => (
                            <li key={tier.months} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`tier-${tier.months}`}
                                    {...register('subscriptionBundle')}
                                    value={tier.months}
                                    className="hidden peer"
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

                <button
                    type="submit"
                    className="bg-blue-600 text-sm dark:bg-blue-700 text-center hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Create Subscription
                </button>
            </form>

            {modalOpen && <CampaignModal setModalOpen={setModalOpen} price={pricePerMonth} />}

            {successModalOpen &&
                <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-950 rounded-lg p-8 place-items-center">
                        <h2 className="text-2xl font-bold text-center mb-4">Subscription Created Successfully!</h2>
                        <p className="mb-4">You can view your active subscription in your profile:</p>
                        <div className="flex flex-col items-center">
                            <Link
                                href={subscriptionUrl}
                                className="border border-gray-300 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-900 rounded-lg px-4 py-2 w-full mx-auto  text-center justify-center content-center"
                            >View Profile</Link>
                            <br />
                            <button
                                className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded mt-4"
                                onClick={() => setSuccessModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

            }
        </div>
    );
}

export default SubscriptionForm;
