import {create} from 'zustand';

interface SubscribeButtonState {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

// Define the Zustand store
const useSubscribeButtonStore = create<SubscribeButtonState>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
}));

export default useSubscribeButtonStore;
