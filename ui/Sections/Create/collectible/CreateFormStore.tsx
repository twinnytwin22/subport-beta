import { create } from 'zustand';

interface CreateFormState {
    audioUrl: null | string;
    imageUrl: null | string;
    imagePreview: null | string;
    songPreview: null | string;
    ipfsMedia: boolean;
    step: number;
    nowChecked: boolean;
    neverChecked: boolean;
    user_id: null | string;
    isUploading: boolean;
    progress: number;
    total: number;
    logAudio: () => void;
    logImage: () => void;
    setAudioUrl: (audioUrl: string | null) => void;
    setImageUrl: (imageUrl: string | null) => void;
    setImagePreview: (imagePreview: string | null) => void;
    setSongPreview: (songPreview: string | null) => void;
    setIpfsMedia: (ipfsMedia: boolean) => void;
    setStep: (step: number) => void;
    setNowChecked: (nowChecked: boolean) => void;
    setNeverChecked: (neverChecked: boolean) => void;
    setUploading: (isUploading: boolean) => void;
    setProgress: (progress: number) => void;
    setTotal: (total: number) => void;
}

export const useCreateFormStore = create<CreateFormState>((set, get) => ({
    audioUrl: null,
    imageUrl: null,
    imagePreview: null,
    songPreview: null,
    ipfsMedia: false,
    step: 1,
    nowChecked: false,
    neverChecked: false,
    user_id: null,
    isUploading: false,
    progress: 0,
    total: 0,
    setAudioUrl: (audioUrl) => set({ audioUrl }),
    setImageUrl: (imageUrl) => set({ imageUrl }),
    setImagePreview: (imagePreview) => set({ imagePreview }),
    setSongPreview: (songPreview) => set({ songPreview }),
    setIpfsMedia: (ipfsMedia) => set({ ipfsMedia }),
    setStep: (step) => set({ step }),
    setNowChecked: (nowChecked) => set({ nowChecked }),
    setNeverChecked: (neverChecked) => set({ neverChecked }),
    setUploading: (isUploading) => set({ isUploading }),
    setProgress: (progress) => set({ progress }),
    setTotal: (total) => set({ total }),
    logAudio: () => {
        console.log(` Audio URL: ${get().audioUrl}`)
    },
    logImage: () => {
        console.log(` Image URL: ${get().imageUrl}`)
    }
}));
