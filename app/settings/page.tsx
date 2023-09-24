'use client'
import { useAuthProvider } from "app/context/auth";
import { useParams } from "next/navigation";
import React from "react";
import SettingsPage, { SettingsPageSmall } from "ui/User/Account";

function Page() {
    const { isLoading, } = useAuthProvider()

    return !isLoading && (
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
