'use client'
import React from 'react'
import { CreateForm } from 'ui/Sections/Create/collectible/CreateForm'
import { useAuthProvider } from 'app/context/auth'
import { LoadingContainer } from 'ui/LoadingContainer'

function Create() {
    const { user, isLoading } = useAuthProvider()


    if (isLoading && !user) {
        return <LoadingContainer />
    }
    return (
        <div className='bg-gray-100 dark:bg-black w-full max-w-screen mx-auto min-h-screen'>
            <CreateForm />
        </div>
    )
}



export default Create