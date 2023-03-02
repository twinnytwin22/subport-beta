'use client'
import Link from 'next/link'
import { useState } from 'react'

function CollectionNav({props}: any) {
  const [activeTab, setActiveTab] = useState('details')
console.log(props, 'cn')
  
  
  return (
   <div className='flex flex-col w-full mx-auto justify-center items-center content-center justify-items-center mt-4'>
<div className="inline-flex rounded-md shadow-sm">
  <div onClick={() => setActiveTab('details')}
  className="px-4 py-2 text-xs font-medium text-white bg-white border border-zinc-200 rounded-l-lg hover:bg-zinc-100 focus:z-10 focus:ring-2 focus:ring-zinc focus:text-zinc dark:bg-zinc-900 dark:border-zinc-600 dark:text-white dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-blue-500 dark:focus:text-white">
    Comments&nbsp;(25)
  </div>
  <div onClick={() => setActiveTab('view-collection')}
  className="px-4 py-2 text-xs rounded-r-lg font-medium text-zinc-900 bg-white border-t border-b border-zinc-200 hover:bg-zinc-100 hover:text-zinc focus:z-10 focus:ring-2 focus:ring-zinc focus:text-zinc dark:bg-zinc-900 dark:border-zinc-600 dark:text-white dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-blue-500 dark:focus:text-white">
    Collectors&nbsp;(45)
  </div>
</div>
<div className="w-full p-6">
        {activeTab === 'details' && '' }
        {activeTab === 'view-collection' && ''}
    
      </div>
</div>   


  )
}
export default CollectionNav