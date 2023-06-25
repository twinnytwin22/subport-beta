import { readSingleContractURI } from 'lib/hooks/readSingleContractURI'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import React from 'react'
import { LoadingContainer } from 'ui/LoadingContainer'
import { DropPage } from 'ui/Sections/Drop/DropPage'
import { fetchSingleCollectible, getDropComments } from 'utils/database'
export const revalidate = 10 // revalidate this page every 60 seconds

export default async function Page({ params }: { params: { slug: string, user: string } }) {
  const { slug } = params
  const res = await fetchSingleCollectible(slug)

  if (res?.error) {
    notFound()
  }

  if (res?.drop !== null) {
    revalidatePath(slug)
    const contractAddress = res?.drop?.contractAddress

    if (contractAddress) {
      const metaData: any = await readSingleContractURI(contractAddress).catch(console.error);

      const dropWithMetaData: any = {
        drop: res?.drop,
        metaData: metaData
      };

      const dropComments = await getDropComments(dropWithMetaData?.drop?.id)

      if (dropWithMetaData) {
        return (
          <div className='bg-gray-100 dark:bg-black w-full items-center mb-20'>
            <DropPage props={dropWithMetaData} comments={dropComments} />
          </div>
        )
      }
    }

  }

  return <LoadingContainer />
}

