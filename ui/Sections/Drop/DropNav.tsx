'use client'
import { useState } from 'react'
import { CommentComponent } from './DropCommentUI'

function DropNav({ dropId, comments }: any) {
  const [activeTab, setActiveTab] = useState('comments')


  return (
    <div className='w-full mx-auto  mt-4 justify-center flex flex-col'>

      <div className="w-full pt-4 mx-auto">
        {activeTab === 'comments' && <CommentComponent key={dropId} dropId={dropId} comments={comments} />}
        {activeTab === 'collectors' && ''}

      </div>
    </div>


  )
}
export default DropNav