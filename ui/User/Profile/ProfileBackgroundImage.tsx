'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from 'lib/constants'
import { SupabaseImage } from 'lib/hooks/downloadImage'
import { useBgImagePath } from 'lib/constants'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'
import { useAuthProvider } from 'app/context/auth'
function ProfileBackgroundImage({ uid, url, publicData, onUpload }: {
    uid: string
    url: SupabaseImage
    publicData?: any
    onUpload?: any
}) {
    const [bgUrl, setBgUrl] = useState<any>(null)
    const [uploading, setUploading] = useState<boolean>(false)
    const { profile } = useAuthProvider()
    const getImage = async (url: SupabaseImage) => {
        const path = useBgImagePath(url)
        setBgUrl(path)
    }
    useEffect(() => {
        if (url) { getImage(url) }
    }, [url, supabase])
    console.log(publicData)
    const uploadBg: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true)
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath: any = `${uid}-${Math.random()}.${fileExt}`

            const updatedBgImage = supabase
                .from('profiles')
                .update({ bg_url: filePath })
                .eq('id', profile?.id)
                .single()

            await updatedBgImage

            let bgPromise = supabase.storage.from('profile_backgrounds').upload(filePath, file)
            toast.promise(
                bgPromise,
                {
                    pending: 'Uploading background image...',
                    success: 'Upload successful.',
                    error: 'There was an error uploading your'
                }
            )

            const bgImage = useBgImagePath(filePath)

            await bgPromise

            setBgUrl(bgImage)

        } catch (error) {
            throw error
        } finally {
            setUploading(false)
        }
    }
    const bgImage = useBgImagePath(profile?.bg_url)
    console.log(bgUrl, "BG_IMAGE")

    return (
        <div className='relative'>
            {bgUrl ? (
                <Image
                    priority
                    className="relative h-60 md:h-80 bg-cover w-full z-0 bg-center bg-no-repeat rounded-md"
                    width={1024}
                    height={300}
                    src={bgUrl}
                    alt='bg-image'
                    style={{ objectFit: 'cover', }}
                />
            ) : (
                <Image
                    priority
                    className="relative h-60 md:h-80 bg-cover w-full z-0 bg-center bg-no-repeat rounded-md"
                    width={1024}
                    height={300}
                    src={'/images/stock/coverBanner.jpg'}
                    alt='bg-image'
                    style={{ objectFit: 'cover', }}
                />
            )}{publicData.Profile.id === profile?.id &&
                <div className='absolute top-6 right-4'>
                    <label
                        className=" text-white text-xl hover:scale-105 cursor-pointer"
                        htmlFor="single"
                    >
                        {uploading ? <FaEdit /> : <FaEdit />}
                    </label>
                    <input
                        style={{
                            visibility: 'hidden',
                            position: 'absolute',
                        }}
                        type="file"
                        id="single"
                        accept="image/*"
                        onChange={uploadBg}
                        disabled={uploading}
                    />
                </div>}
        </div>
    )
}

export default ProfileBackgroundImage