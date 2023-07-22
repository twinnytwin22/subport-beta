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
export const CommentModal = ({ dropId, close }: any) => {
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


    const handleDiscardComment = () => {
        setShowTextarea(false);
        setComment('');
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center z-50 isolate">
            <div className='bg-white dark:bg-black opacity-80 h-full w-full z-10 absolute'></div> {/* Updated z-index here */}
            <p className='cursor-pointer absolute p-2 border dark:border-zinc-700 border-zinc-300 rounded text-sm z-20 left-5 top-5 text-black dark:text-white bg-white dark:bg-black' onClick={close}>Close</p> {/* Updated z-index here */}
            {profile && (
                <div className="w-full h-4 rounded max-w-md mx-auto relative z-20 items-center mt-20 text-black"> {/* Updated z-index here */}
                    {/* Use the MentionsInput to handle the textarea with mentions */}
                    <MentionsInput
                        className='text-black'
                        value={comment}
                        style={mentionInputStyles}
                        a11ySuggestionsListLabel={"Suggested mentions"}
                        onChange={handleCommentChange}
                    //  singleLine// Add this prop to handle single-line comments
                    >
                        <Mention
                            style={mentionStyles}
                            displayTransform={(username) => `@${username}`}
                            // key={comment}
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
                    <br />
                    <div className="flex space-x-2 items-center content-end justify-end text-white">
                        <button className="text-xs p-1.5 bg-blue-700 hover:bg-blue-600 rounded-md  text-center font-bold" onClick={handleAddComment}><FaPaperPlane /></button>
                        <button className="text-xs p-1.5 bg-red-600 hover:bg-red-500 rounded-md  text-center font-bold" onClick={handleDiscardComment}><FaTrash /></button>
                    </div>
                </div>
            )}
            <div className='relative z-10 mt-28 h-full overflow-y-scroll max-h-96 mx-2.5'> {/* Lower z-index here */}
                {comments[0]?.length > 0 ? 'Be the first to comment' : ''}

                {[...comments]?.reverse()?.map((comment: any, i) => (

                    <div key={i} className="p-2.5 rounded-md text-sm bg-zinc-100 dark:bg-zinc-950 my-2 border-zinc-300 dark:border-zinc-900 border relative">

                        <Link
                            href={`/${comment.profiles?.username}`}
                            className="text-xs cursor-pointer text-zinc-600  dark:text-zinc-400"
                        >
                            {`${userId && userId === comment.user_id ? 'You' : `@${comment?.profiles?.username}`}`}
                        </Link>
                        <div className='border-l-2 m-2 h-fit border-blue-600'>
                            <p className='pl-2 text-sm'>
                                {comment?.comment}
                            </p>
                        </div>
                        {userId && userId === comment.user_id ? (
                            <div className="text-sm text-blue-600 underline cursor-pointer absolute right-3 bottom-3 hover:scale-125 duration-300 ease-in-out" onClick={() => handleDeleteComment(comment.id)}>
                                <FaTrash />
                            </div>
                        ) : ('')}

                    </div>
                ))}
            </div>
        </div>
    );

}

