'use client'

import CampaignForm from "./CampaignForm";

function CampaignModal({ setModalOpen, price }: any) {



    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="">

            <div className="absolute inset-0 z-49 flex items-start mt-24 justify-center h-screen overflow-y-hidden">
                <div className="fixed inset-0 bg-black opacity-50 overflow-y-hidden "></div>

                <div className="bg-white dark:bg-zinc-950 w-full max-w-2xl p-8 rounded shadow relative border border-zinc-100 dark:border-zinc-800 ">
                    <CampaignForm close={closeModal} price={price} />

                </div>
            </div>
        </div>
    );
}

export default CampaignModal;
