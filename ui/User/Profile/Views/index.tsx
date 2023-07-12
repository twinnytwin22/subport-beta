'use client'
import React, { useState } from 'react';
import CardView from './CardView';
import ProfileMusicList from './ProfileMusicList';

enum View {
    LIST_VIEW,
    CARD_VIEW,
}

function Views({ drops, currentProfile }: any) {
    const [selectedView, setSelectedView] = useState<View>(View.LIST_VIEW);

    const handleListView = () => {
        setSelectedView(View.LIST_VIEW);
    };

    const handleCardView = () => {
        setSelectedView(View.CARD_VIEW);
    };

    return currentProfile && (
        <div>
            <button type="button" className="px-4 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-l-lg hover:bg-zinc-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={handleListView}>List View</button>
            <button type="button" className="px-4 py-2 text-sm font-medium text-zinc-900 bg-white border border-zinc-200 rounded-r-md hover:bg-zinc-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={handleCardView}>Card View</button>
            {selectedView === View.LIST_VIEW && <ProfileMusicList drops={drops} currentProfile={currentProfile} />}
            {selectedView === View.CARD_VIEW && <CardView drops={drops} />}
        </div>
    );
}

export default Views;
