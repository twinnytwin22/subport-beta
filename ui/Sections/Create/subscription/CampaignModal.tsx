'use client'

import CampaignForm from "./CampaignForm";

function CampaignModal({ setModalOpen }: any) {



    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>

            <div className="absolute inset-0 z-49 flex items-center justify-center">
                <div className="fixed inset-0 "></div>

                <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl p-8 rounded shadow relative">
                    <CampaignForm />
                    <div
                        className="mt-4 bg-zinc-100 border-zinc-300 border dark:border-zinc-900 dark:bg-black text-center text-black dark:text-white px-4 py-2 rounded relative z-50"
                        onClick={closeModal}
                    >
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignModal;
