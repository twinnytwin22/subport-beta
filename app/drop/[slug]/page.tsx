import React from 'react'
import { notFound } from 'next/navigation'
import { LoadingContainer } from 'ui/LoadingContainer'
import DropEditor from 'ui/Sections/Drop/DropEditor'
import DropPage  from 'ui/Sections/Drop/DropPage'
import { fetchSingleCollectible } from 'utils/use-server'
export const dynamic = 'force-dynamic'
export const revalidate = 5
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

  const props: any = {
    drop: data?.drop,
    metaData: data?.metaData,
    //comments: res?.dropComments,
    //  reactionCount: res?.reactionCount,
  
  };
 // console.log(props)
  return props && (
    <div className='bg-zinc-100 dark:bg-black w-full items-center mb-20 min-h-full relative mx-auto justify-center'>
      <DropPage props={props ?? []} />
      <DropEditor props={props ?? []} />
    </div>
  )
}


