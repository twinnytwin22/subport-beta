import { create } from 'zustand'


export const refresh = () => {
    window.location.reload();
};
export interface AuthState {
    user: any;
    profile: any;
    isLoading: boolean;
    session: any
    signOut: any
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    profile: null,
    isLoading: false,
    session: null,
    signOut: undefined
    
    
}));