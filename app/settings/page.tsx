import { getSession } from "lib/providers/supabase/supabase-client-server";
import React from "react";
import SettingsPage, { SettingsPageSmall } from "ui/User/Account";

async function Page() {
const session = await getSession() 
console.log(session)
    return session && (
        <section>
            <div className="hidden md:block">
        <SettingsPage/>
        </div>
        <div className="block md:hidden">
        <SettingsPageSmall/>
        </div>
        </section>
    )
}
export default Page;
