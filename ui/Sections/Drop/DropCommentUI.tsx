"use client";
import { useAuthProvider } from "app/context/auth";
import Link from "next/link";
import { useEffect } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import {
    getDropComments,
} from "utils/database";
import { Mention, MentionsInput } from "react-mentions";
import mentionStyles from "styles/mentionStyles";
import mentionInputStyles from "styles/mentionInputStyles";
import useCommentsStore from "app/context/comments/store";
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
        handleCommentChange,
    } = useCommentsStore();
    const { profile } = useAuthProvider();
    const userId = profile?.id;

    useEffect(() => {
        getComments(dropId);
    }, [comment]);
    useEffect(() => {
        getUsers();
        console.log(users);
    }, []);

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
                                ? "You"
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
                <div className="w-full mb-4">
                    {/* Use the MentionsInput to handle the textarea with mentions */}
                    <MentionsInput
                        style={mentionInputStyles}
                        className="w-full max-w-md mb-2"
                        value={comment}
                        onChange={(e: any) => handleCommentChange(e.target.value)}
                    // singleLine={true} // Add this prop to handle single-line comments
                    >
                        <Mention
                            style={mentionStyles}
                            className="w-full max-w-md"
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
                        <button
                            className="text-xs p-1.5 bg-blue-700 hover:bg-blue-600 rounded-md  text-center font-bold"
                            onClick={() => handleAddComment(dropId, userId)}
                        >
                            <FaPaperPlane />
                        </button>
                        <button
                            className="text-xs p-1.5 bg-zinc-600 hover:bg-red-500 rounded-md  text-center font-bold"
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
