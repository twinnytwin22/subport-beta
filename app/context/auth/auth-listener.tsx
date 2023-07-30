'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "lib/constants";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { Session } from "@supabase/auth-helpers-nextjs";

const useAuthListener = ({ serverSession }: { serverSession: Session | null }) => {
    const router = useRouter();
    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== serverSession?.access_token) {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase, serverSession?.access_token]);
};

export { useAuthListener };