import { readSingleContractURI } from 'lib/hooks/readSingleContractURI'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import React from 'react'
import { LoadingContainer } from 'ui/LoadingContainer'
import { DropPage } from 'ui/Sections/Drop/DropPage'
import { fetchSingleCollectible, getDropComments } from 'utils/database'
export const revalidate = 0// revalidate this page every 60 seconds
export const dynamic = 'force-dynamic'
export default async function Page({ params }: { params: { slug: string, user: string } }) {
  const { slug } = params
  const res = await fetchSingleCollectible(slug)

  if (res?.error) {
    notFound()
  }

  if (res?.drop !== null) {
    revalidatePath(slug)

    const imageUrl = res?.dropWithMetaData?.metaData.metadata?.image?.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
      || res?.dropWithMetaData?.metaData.metadata?.data?.image.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/');
    const props: any = {
      drop: res?.drop,
      metaData: res?.dropWithMetaData.metaData.metadata,
      comments: res?.dropComments,
      reactionCount: res?.reactionCount,
      imageUrl,
    };
    console.log(props)
    return (
      <div className='bg-gray-100 dark:bg-black w-full items-center mb-20 min-h-full'>
        <DropPage props={props ?? []} />
      </div>
    )
  }
  return <LoadingContainer />

}

