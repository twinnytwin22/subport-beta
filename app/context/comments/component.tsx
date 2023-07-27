import React, { useEffect } from "react";
import useCommentsStore from "./store";
const CommentsModal = ({ dropId, userId }: any) => {
  const {
    comment,
    showTextarea,
    comments,
    users,
    getComments,
    getUsers,
    handleCommentChange,
    handleAddComment,
    handleDeleteComment,
    handleDiscardComment,
  } = useCommentsStore();

  useEffect(() => {
    getComments(dropId);
  }, [comment]);

  useEffect(() => {
    getUsers();
  }, []);

  return <>COMMENTS</>;
};

export default CommentsModal;
