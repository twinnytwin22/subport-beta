'use server'
import { supabaseAuth } from "lib/constants"
import { createServerClient } from "./supabase-server"

const supabase = createServerClient()
export const getSession = async () => {
    const {data: session} = await supabase.auth.getSession()
    console.log(session)
    return session.session
}