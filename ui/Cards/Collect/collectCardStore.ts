import { create } from 'zustand';

interface CollectCardStore {
  openComments: boolean;
  setOpenComments: (openComments: boolean) => void;
}

export const useCollectCardStore = create<CollectCardStore>((set, get) => ({
  openComments: false,
  setOpenComments: (openComments) => set({ openComments })
}));
