'use client'
import { useAuthProvider } from 'app/context/auth';
import Link from 'next/link';
import { useState } from 'react';
import { addDropComment, deleteDropComment, getDropComments } from 'utils/database';

const CommentComponent = ({ dropId, comments }: any) => {
    console.log(comments);
    const { profile } = useAuthProvider();
    const [comment, setComment] = useState('');
    const [showTextarea, setShowTextarea] = useState(false);

    const userId = profile?.id;

    const handleCommentChange = (e: any) => {
        setComment(e.target.value);
    };

    const handleAddComment = async () => {
        try {
            await addDropComment(dropId, comment, userId);
            // Clear the comment input after successful submission
            setComment('');

            // Fetch the updated list of comments
            const updatedComments = await getDropComments(dropId);
            return updatedComments;
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: any) => {
        try {
            await deleteDropComment(dropId, userId, commentId);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleShowTextarea = () => {
        setShowTextarea(true);
    };

    const handleDiscardComment = () => {
        setShowTextarea(false);
        setComment('');
    };

    return (
        <div className="w-full">
            {showTextarea ? (
                <div className='w-full'>
                    <textarea className="w-full mb-2" value={comment} onChange={handleCommentChange} />
                    <div className='flex space-x-2 items-center text-white'>
                        <button className="text-xs p-1.5 bg-blue-700  hover:bg-blue-600  rounded-md w-full text-center font-bold " onClick={handleAddComment}>Submit</button>
                        <button className="text-xs p-1.5 bg-red-600  hover:bg-red-500  rounded-md w-full text-center font-bold" onClick={handleDiscardComment}>Discard</button>
                    </div>
                </div>
            ) : (
                <button className="text-xs p-1.5 bg-blue-700 hover:bg-blue-600 rounded-md w-full text-center font-bold text-white" onClick={handleShowTextarea}>Add Comment</button>
            )}
            <div>
                {[...comments].map((comment: any) => (
                    <div key={comment?.id} className="p-2.5 relative rounded-md text-sm bg-zinc-200 dark:bg-zinc-950 my-2 border-zinc-300 dark:border-zinc-900 border">

                        <Link href={`/${comment.profiles?.username}`} className='text-xs cursor-pointer text-zinc-600 dark:zinc-400'>@{comment?.profiles?.username}</Link>
                        <div className='border-l-2 m-2 h-fit border-blue-600  '>
                            <p className='p-1 text-sm'>{comment?.comment}</p></div>
                        {userId && userId === comment.user_id && (
                            <p className="text-xs text-blue-500 underline cursor-pointer absolute right-3 bottom-3" onClick={(() => handleDeleteComment(comment.id))}>Delete</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentComponent;
