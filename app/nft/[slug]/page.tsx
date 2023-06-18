import { readContractURIs } from 'lib/hooks/readContractURIs'
import { readSingleContractURI } from 'lib/hooks/readSingleContractURI'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import React from 'react'
import { LoadingContainer } from 'ui/LoadingContainer'
import { NFTPage } from 'ui/Sections/NFTPage'
import { fetchSingleCollectible } from 'utils/database'

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

      if (dropWithMetaData) {
        return (
          <div className='bg-gray-100 dark:bg-black'>
            <NFTPage props={dropWithMetaData} />
          </div>
        )
      }
    }

  }

  return <LoadingContainer />
}

