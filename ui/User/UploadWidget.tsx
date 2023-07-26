'use client'
import React, { useEffect, useState } from 'react'
import { SupabaseImage, downloadImage } from 'lib/hooks/downloadImage'
import { supabase, useImagePath } from 'lib/constants'
import Image from 'next/image'
import { FaEdit } from 'react-icons/fa'


export default function Avatar({ uid, url, size, onUpload }: {
  uid: string
  url: SupabaseImage
  size: number
  onUpload: any
}) {
  const [avatarUrl, setAvatarUrl] = useState<any>(null)
  const [uploading, setUploading] = useState<boolean>(false)

  const getImage = async (url: SupabaseImage) => {
    const path = useImagePath(url)
    setAvatarUrl(path)
  }
  useEffect(() => {
    if (url) { getImage(url) }
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }
      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }
  if (avatarUrl) {
    console.log(avatarUrl)
    return (
      <div className='mx-auto justify-center items-center content-center relative' style={{ position: 'relative' }}>
        {avatarUrl ? (
          <Image
            priority
            placeholder='blur'
            blurDataURL={"/images/stock/blur.png"}
            src={avatarUrl}
            alt="Avatar"
            className="avatar image rounded-md mb-4 mx-auto justify-center hover:brightness-75 duration-300 ease-in-out"
            width={size}
            height={size} />
        ) : (
          <div className="avatar no-image" style={{ height: size, width: size }} />
        )}
        <div className={`absolute bottom-4 right-4 w-[${size}] h-[${size}]`}>
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
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      </div>
    )
  };

}