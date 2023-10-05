'use client'
import { useAuthProvider } from 'app/context/auth'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import useDropSettings from './store'
import DropEditForm from './DropEditForm'

function DropEditor({ props }: any) {
    const drop = props?.drop!
    const searchParams = useSearchParams()
    const editDrop = searchParams.get('editDrop')
    const { user } = useAuthProvider()
    const isAuthedUser = drop?.user_id === user?.id
    console.log(drop)
    if (editDrop && isAuthedUser) {
        return (
            <div className="bg-zinc-100 dark:bg-black h-full flex max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto w-full mt-2.5 md:mt-12 pb-12 ">
              <DropEditForm drop={drop}/>
            </div>
        )
    }


    return null
}
export default DropEditor