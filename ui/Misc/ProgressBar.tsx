'use client'

import { useCreateFormStore } from 'ui/Sections/Create/collectible/CreateFormStore';


export const renderProgressBar = (progress: any, total: any) => {

    let newTotal = progress / total * 100
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-50 isolate">
            <div className='bg-black opacity-80 h-full z-20 absolute w-full'></div>

            <div className="w-full h-4 bg-gray-200 rounded max-w-md mx-auto relative z-50">
                <div
                    className="h-full bg-gradient-to-r  from-blue-500 to-blue-800 rounded transition-width"
                    style={{ width: `${newTotal || 0}%` }}
                ></div>
                <p className="mt-2 text-white p-2.5 px-4 bg-black w-36 mx-auto justify-center text-center">{newTotal || 0}%</p>

            </div>
        </div>
    );
};

