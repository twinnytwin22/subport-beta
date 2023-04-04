import { getCollections } from 'lib/hooks/supaQueries'
import React from 'react'

async function page() {
  const collections = await getCollections()
  console.log(collections)
  
  return (
    <div>
    </div>
  )
}

export default page