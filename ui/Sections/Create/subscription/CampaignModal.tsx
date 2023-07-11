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

                <div className="bg-white dark:bg-zinc-950 w-full max-w-2xl p-8 rounded shadow relative border border-zinc-100 dark:border-zinc-800">
                    <CampaignForm close={closeModal} />

                </div>
            </div>
        </div>
    );
}

export default CampaignModal;
