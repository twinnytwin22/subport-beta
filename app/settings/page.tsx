import { supabase } from "lib/constants";
import React from "react";
import SettingsPage, { SettingsPageSmall } from "ui/User/Account";

async function Page() {
const session = await supabase.auth.getSession()

//console.log(session)
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
