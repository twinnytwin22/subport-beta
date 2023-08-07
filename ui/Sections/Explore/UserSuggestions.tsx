'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useImagePath } from 'lib/constants'
import { FollowButton } from 'ui/Buttons/FollowButton'
import { useAuthProvider } from 'app/context/auth'
import { LoadingContainer } from 'ui/LoadingContainer'

function UserSuggestions() {
    const { profile: user, isLoading } = useAuthProvider()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch('/api/v1/getAllUsers')
            const data = await res.json()

            if (data) {
                setUsers(data)
                setLoading(false)
            }
        }
        getUsers()
    }, [])



    // Filter out the current user from the suggestions
    const filteredUsers = users.filter((u) => u.id !== user?.id)

    if (isLoading || loading) {
        return <LoadingContainer />
    }

    return (
        <div className="mx-auto p-4 max-w-xs w-full space-y-4">
            {filteredUsers.slice(0, 4).map((user) => (
                <div className='flex items-center p-2.5 justify-between  bg-white border border-zinc-200 rounded-md dark:bg-zinc-950 dark:border-zinc-700  shadow-sm shadow-zinc-200 dark:shadow-zinc-900 w-56 xl:w-72 space-x-4 relative' key={user?.id}>
                    <Link href={`/${user?.username}`}>
                        <Image
                            width={32}
                            height={32}
                            className="shadow-lg dark:shadow-zinc-950 shadow-zinc-300 mx-4 lg:mx-auto w-8 h-8 rounded-full"
                            src={useImagePath(user?.avatar_url)}
                            style={{ objectFit: "cover" }}
                            alt="Song-cover"
                            blurDataURL={'/images/stock/blur.png'}
                        />
                    </Link>
                    <Link className='' href={`/${user?.username}`}>
                        <p className='text-xs'>{user.username}</p></Link>
                    <FollowButton currentProfile={user} />
                </div>
            ))}
        </div>
    )
}

export default UserSuggestions
