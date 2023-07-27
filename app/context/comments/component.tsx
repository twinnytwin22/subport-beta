import React, { useEffect } from "react";
import useCommentsStore from "./store";
import { useAuthProvider } from "../auth";
import Link from "next/link";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import { MentionsInput, Mention } from "react-mentions";
import mentionInputStyles from "styles/mentionInputStyles";
import mentionStyles from "styles/mentionStyles";
import { addDropComment, getDropComments, deleteDropComment } from "utils/database";
const CommentsModal = ({ dropId, userId }: any) => {
  const { profile } = useAuthProvider()
  const {
    comment,
    showTextarea,
    comments,
    users,
    getUsers,

  } = useCommentsStore();
  const getComments = async () => {
    const dropComments = await getDropComments(dropId);
    useCommentsStore.setState({ comments: dropComments })
  }
  useEffect(() => {
    getComments();
  }, [comment]);

  useEffect(() => {
    getUsers();
  }, []);

  const handleCommentChange = (e: any) => {
    useCommentsStore.setState({ comment: e.target.value })

  };

  const handleAddComment = async () => {
    try {
      await addDropComment(dropId, comment, userId);
      // Clear the comment input after successful submission
      useCommentsStore.setState({ comment: '' })
      // Fetch the updated list of comments
      const updatedComments = await getDropComments(dropId);
      useCommentsStore.setState({ comments: updatedComments })

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
    useCommentsStore.setState({ showTextarea: true })
  };

  const handleDiscardComment = () => {
    useCommentsStore.setState({ comment: '' })
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
            <button className="text-xs p-1.5 bg-zinc-600 hover:bg-red-500 rounded-md  text-center font-bold" onClick={handleDiscardComment}><FaTrash /></button>
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
    </div>);
};

export default CommentsModal;
