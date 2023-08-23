import { useImagePath, useIpfsImage, useIpfsUrl } from 'lib/constants'
import { notFound } from 'next/navigation'
import React from 'react'
import { LoadingContainer } from 'ui/LoadingContainer'
import { DropPage } from 'ui/Sections/Drop/DropPage'
import { fetchSingleCollectible } from 'utils/use-server'
export const revalidate = 0// revalidate this page every 60 seconds
export const dynamic = 'force-dynamic'
export default async function Page({ params }: { params: { slug: string, user: string } }) {
  const { slug } = params
  const res = await fetchSingleCollectible({ slug })
  const data = await res
  if (res?.error) {
    notFound()
  }

  if (!data) {
    return <LoadingContainer />
  }
  const audioUrl = useIpfsUrl(data?.metaData?.animation_url)

  const imageUrl = ''
  const props: any = {
    drop: data?.drop,
    metaData: data?.metaData,
    //comments: res?.dropComments,
    //  reactionCount: res?.reactionCount,
    audioUrl,
    imageUrl: useIpfsImage(data?.metaData?.image),
  };
  console.log(props)
  return props && (
    <div className='bg-zinc-100 dark:bg-black w-full items-center mb-20 min-h-full relative mx-auto justify-center'>
      <DropPage props={props ?? []} />
    </div>
  )
}


