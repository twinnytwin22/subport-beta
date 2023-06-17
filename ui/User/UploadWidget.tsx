'use client'
import React, { useEffect, useState } from 'react'
import { supabaseAdmin } from 'app/supabase-admin'
import { SupabaseImage, downloadImage } from 'lib/hooks/downloadImage'
import { useImagePath } from 'lib/constants'


export default function Avatar({ uid, url, size, onUpload }: {
  uid: string
  url: SupabaseImage
  size: number
  onUpload: any
}) {
  const [avatarUrl, setAvatarUrl] = useState<any>(url || null)
  const [uploading, setUploading] = useState<boolean>(false)

  const getImage = async (url: SupabaseImage) => {
    const path = useImagePath(url)
    setAvatarUrl(path)
  }
  console.log(avatarUrl)
  useEffect(() => {
    if (url) { getImage(url) }
  }, [url, supabaseAdmin])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      let { error: uploadError } = await supabaseAdmin.storage.from('avatars').upload(filePath, file)

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
  return (
    <div className='mx-auto justify-center items-center content-center'>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image rounded-lg mb-4"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label
          className="bg-blue-700 text-white p-2.5 text-sm w-32 rounded-lg hover:bg-blue-800 hover:scale-105"
          htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
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
}