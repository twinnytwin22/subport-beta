import { readSingleContractURI } from 'lib/hooks/readSingleContractURI'
import { revalidatePath } from 'next/cache'
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

  const imageUrl = data?.metaData?.image?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/') || data?.metaData?.info.metadata.image?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
  const props: any = {
    drop: data?.drop,
    metaData: data?.metaData || data?.metaData?.info.metadata,
    //comments: res?.dropComments,
    //  reactionCount: res?.reactionCount,
    imageUrl,
  };
  console.log(props)
  return (
    <div className='bg-gray-100 dark:bg-black w-full items-center mb-20 min-h-full'>
      <DropPage props={props ?? []} />
    </div>
  )
}


