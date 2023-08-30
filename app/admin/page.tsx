import { supabase } from 'lib/constants';
import { supabaseAdmin } from "lib/constants";
import React from 'react'

export const dynamic = 'force-dynamic'
export default async function IndexPage({
    searchParams
}: {
    searchParams: { q: string };
}) {
    const search = searchParams.q ?? '';
    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')

    const { data: users } = await supabaseAdmin.auth.admin.listUsers()


    //console.log(users, 'USERS')
    return profiles && (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 mt-16">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <ProfilesTable profiles={profiles as any} />

            </div>
        </section >
    )
}

type AdminDashBoard = {
    profiles?: Profile[] | null
}

type Profile = [
    {
        id: string,
        email?: string,
        username?: string,
        wallet_address?: string,
        city?: string,
        state?: string,
        country?: string
    }
]

const ProfilesTable = ({ profiles }: { profiles: Profile }) => {
    return (
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Username</th>
                            <th scope="col" className="px-4 py-3">Email</th>
                            <th scope="col" className="px-4 py-3">City</th>
                            <th scope="col" className="px-4 py-3">State</th>
                            <th scope="col" className="px-4 py-3">Country</th>
                            <th scope="col" className="px-4 py-3">Wallet</th>

                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles?.map((profile) => (
                            <tr className="border-b dark:border-gray-700" key={profile.id}>
                                <td className="px-4 py-3">{profile.username}</td>
                                <td className="px-4 py-3">{profile.email}</td>
                                <td className="px-4 py-3">{profile.city}</td>
                                <td className="px-4 py-3">{profile.state}</td>
                                <td className="px-4 py-3">{profile.country}</td>
                                <td className="px-4 py-3 truncate w-24">{profile.wallet_address}</td>

                                <td className="px-4 py-3">
                                    {/* Add actions here if needed */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}