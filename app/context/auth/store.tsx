import { supabase, supabaseAuth } from "lib/constants";
import { toast } from "react-toastify";
import { create } from 'zustand'
const redirectUrl = 'http://localhost:3000/api/auth/callback/' 


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