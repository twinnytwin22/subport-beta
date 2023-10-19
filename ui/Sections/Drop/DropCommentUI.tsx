'use client';
import { useAuthProvider } from 'app/context/auth';
import useCommentsStore from 'app/context/global-ui/store';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';
import { Mention, MentionsInput } from 'react-mentions';
import emojiMentionStyles from 'styles/emojiMentionStyles';
import emojis from 'utils/emojis.json';

const neverMatchingRegex = /($a)/;

export const CommentComponent = ({ dropId }: any) => {
  const {
    comments,
    comment,
    users,
    getUsers,
    getComments,
    showTextarea,
    handleAddComment,
    handleDeleteComment,
    handleDiscardComment,
    handleCommentChange
  } = useCommentsStore();
  const { profile } = useAuthProvider();
  const userId = profile?.id;

  useEffect(() => {
    getComments(dropId);
  }, [comment, dropId]);
  useEffect(() => {
    getUsers();
    // console.log(users);
  }, []);

  const queryEmojis = (query: string, callback: any) => {
    if (query.length === 0) return;

    const matches = emojis.emojis
      .filter((emoji: any) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1;
      })
      .slice(0, 10);
    return matches.map(({ emoji }: any) => ({ id: emoji }));
  };

  return (
    <div className="w-full">
      <div className="overflow-y-scroll h-60">
        {[...comments]?.reverse().map((comment: any, i) => (
          <div
            key={i}
            className="p-1 pl-2.5 relative rounded-md text-xs bg-zinc-200 dark:bg-zinc-950 my-2 border-zinc-300 dark:border-zinc-900 border"
          >
            <Link
              href={`/${comment.profiles?.username}`}
              className="text-[10px] cursor-pointer text-zinc-600 dark:text-zinc-400"
            >
              {`${userId && userId === comment.user_id
                ? 'You'
                : `@${comment?.profiles?.username}`
                }`}
            </Link>
            <div className="border-l-2 m-2 h-fit border-blue-600  ">
              <p className="pl-2 text-xs">{comment?.comment}</p>
            </div>
            {userId && userId! === comment.user_id! && (
              <div
                className="text-sm text-blue-600 underline cursor-pointer absolute right-3 bottom-3 hover:scale-125 duration-300 ease-in-out z-50"
                onClick={() => handleDeleteComment(dropId, userId, comment.id)}
              >
                <FaTrash />
              </div>
            )}
          </div>
        ))}
      </div>
      {profile && (
        <div className="w-full mt-4 flex ">
          {/* Use the MentionsInput to handle the textarea with mentions */}
          <MentionsInput
            style={emojiMentionStyles}
            singleLine
            color="white"
            placeholder="Add your comment..."
            className="w-full max-w-md h-full will-change-auto mb-2 bg-white dark:bg-black text-xs ring-0 ring-white dark:ring-black "
            value={comment}
            onChange={(e: any) => handleCommentChange(e.target.value)}
          >
            <Mention
              className="w-full max-w-md will-change-auto  text-black dark:text-white bg-zinc-100 dark:bg-zinc-950"
              displayTransform={(username) => `@${username}`}
              key={comment}
              trigger="@"
              regex={/@(\S+)/}
              data={users} // Pass the users array as the data source for mentions
              renderSuggestion={(suggestion, search, highlightedDisplay) => (
                // Use 'key' prop here to resolve key error
                <div
                  className="user-suggestion text-black dark:text-white text-xs h-5"
                  key={suggestion.display}
                >
                  {highlightedDisplay}
                </div>
              )}
              // Optionally, specify the markup prop here to customize the mention format
              markup="@__display__"
            />
            <Mention
              trigger=":"
              markup="__id__"
              regex={neverMatchingRegex}
              data={queryEmojis}
            />
          </MentionsInput>
          <div className="flex h-fit justify-end text-white mt-1 pl-2">
            <button
              className="text-xs p-1.5 bg-blue-700 hover:bg-blue-600 rounded-md  text-center font-bold"
              onClick={() => handleAddComment(dropId, userId)}
            >
              <FaPaperPlane />
            </button>
            <button
              className="hidden text-xs p-1.5 bg-zinc-600 hover:bg-red-500 rounded-md  text-center font-bold"
              onClick={handleDiscardComment}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
