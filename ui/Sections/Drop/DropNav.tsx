'use client'
import { useState } from 'react'
import CommentComponent from './DropCommentUI'

function DropNav({ dropId, comments }: any) {
  const [activeTab, setActiveTab] = useState('comments')


  return (
    <div className='w-full mx-auto  mt-4 justify-center flex flex-col'>
      <div className="inline-flex justify-center rounded-md shadow-sm w-full mx-auto">
        <div onClick={() => setActiveTab('comments')}
          className="px-4 py-2 text-xs font-medium text-zinc-900 bg-white border border-zinc-200 rounded-l-lg hover:bg-zinc-100 focus:z-10 focus:ring-2 focus:ring-zinc focus:text-zinc dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:hover:text-white dark:hover:bg-zinc-800 dark:focus:ring-blue-500 dark:focus:text-white">
          Comments&nbsp;(25)
        </div>
        <div onClick={() => setActiveTab('collectors')}
          className="px-4 py-2 text-xs rounded-r-lg font-medium text-zinc-900 bg-white border-t border-b border-zinc-200 hover:bg-zinc-100 hover:text-zinc focus:z-10 focus:ring-2 focus:ring-zinc focus:text-zinc dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:hover:text-white dark:hover:bg-zinc-800 dark:focus:ring-blue-500 dark:focus:text-white">
          Collectors&nbsp;(45)
        </div>
      </div>
      <div className="w-full pt-4 mx-auto">
        {activeTab === 'comments' && <CommentComponent key={dropId} dropId={dropId} comments={comments} />}
        {activeTab === 'collectors' && ''}

      </div>
    </div>


  )
}
export default DropNav