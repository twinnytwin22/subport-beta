'use client'
import { useAuthProvider } from 'app/context/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCommentAlt, FaPaperPlane, FaTrash } from 'react-icons/fa';
import { addDropComment, deleteDropComment, getDropComments } from 'utils/database';
import { Mention, MentionsInput } from "react-mentions";
import { supabase } from 'lib/constants';
import mentionStyles from 'styles/mentionStyles';
import mentionInputStyles from 'styles/mentionInputStyles';
export const CommentComponent = ({ dropId }: any) => {
    const { profile } = useAuthProvider();
    const [comment, setComment] = useState('');
    const [showTextarea, setShowTextarea] = useState(false);
    const [comments, setComments] = useState([''])
    const [users, setUsers] = useState<any>([''])
    const userId = profile?.id;
    const getComments = async () => {
        const dropComments = await getDropComments(dropId);
        setComments(dropComments)
    }
    const getUsers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('username, id')
        if (error) {
            throw error
        }
        if (data) {
            const allUsers = data.map((user) => ({ display: user.username, id: user.id }))
            setUsers(allUsers)
        }
    }
    useEffect(() => {
        getComments()
    }, [comment])
    useEffect(() => {
        getUsers()
        console.log(users)
    }, [])
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
            setComments(updatedComments)
            return updatedComments;
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: any) => {
        try {
            await deleteDropComment(dropId, userId, commentId);
            await getComments()
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
            {profile && showTextarea ? (
                <div className="w-full mb-4">
                    {/* Use the MentionsInput to handle the textarea with mentions */}
                    <MentionsInput
                        style={mentionInputStyles}
                        className='w-full max-w-md mb-2'
                        value={comment}
                        onChange={handleCommentChange}
                    // singleLine={true} // Add this prop to handle single-line comments
                    >
                        <Mention
                            style={mentionStyles}
                            className='w-full max-w-md'
                            displayTransform={(username) => `@${username}`}
                            key={comment}
                            trigger="@"
                            data={users} // Pass the users array as the data source for mentions
                            renderSuggestion={(suggestion, search, highlightedDisplay) => (
                                // Use 'key' prop here to resolve key error
                                <div className="user-suggestion h-5" key={suggestion.display}>
                                    {highlightedDisplay}
                                </div>
                            )}
                            // Optionally, specify the markup prop here to customize the mention format
                            markup="@[__display__]"
                        />
                    </MentionsInput>
                    <div className="flex space-x-2 items-center justify-end text-white">
                        <button className="text-xs p-1.5 bg-blue-700 hover:bg-blue-600 rounded-md  text-center font-bold" onClick={handleAddComment}><FaPaperPlane /></button>
                        <button className="text-xs p-1.5 bg-red-600 hover:bg-red-500 rounded-md  text-center font-bold" onClick={handleDiscardComment}><FaTrash /></button>
                    </div>
                </div>
            ) : (
                <button className={`text-xs p-1.5 bg-blue-700 hover:bg-blue-600 rounded-md w-full text-center font-bold text-white ${!profile && 'hidden'}`} onClick={profile && handleShowTextarea}>Comment</button>
            )}
            <div className='overflow-y-scroll h-52'>
                {[...comments]?.map((comment: any, i) => (
                    <div key={i} className="p-1.5 relative rounded-md text-sm bg-zinc-200 dark:bg-zinc-950 my-2 border-zinc-300 dark:border-zinc-900 border">

                        <Link
                            href={`/${comment.profiles?.username}`}
                            className="text-xs cursor-pointer text-zinc-600 dark:zinc-400"
                        >
                            {`${userId && userId === comment.user_id ? 'You' : `@${comment?.profiles?.username}`}`}
                        </Link>
                        <div className='border-l-2 m-2 h-fit border-blue-600  '>
                            <p className='pl-2 text-sm'>{comment?.comment}</p></div>
                        {userId && userId! === comment.user_id! && (
                            <div className="text-sm text-blue-600 underline cursor-pointer absolute right-3 bottom-3 hover:scale-125 duration-300 ease-in-out z-50" onClick={(() => handleDeleteComment(comment.id))}><FaTrash /></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

