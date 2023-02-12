import React, { FC } from "react";
import { Comment } from "../types/types";
import styles from "../styles/CommentsList.module.scss";
import SingleComment from "./SingleComment";

type CommentsComponent = {
  comments: Comment[];
  canReply: boolean;
};

const CommentsList: FC<CommentsComponent> = ({ comments, canReply }) => {
  
  const rootComments = comments.filter((comm) => comm?.parentId === null);
  const getReplies = (commentId: any) => {
    //ts-ignore
    return comments
      .filter((comm) => comm?.parentId === commentId)
      .sort((a, b) => {
        const aDate =
          typeof a?.createdAt === "string"
            ? new Date(a.createdAt)
            : a.createdAt instanceof Date
            ? a.createdAt
            : new Date(0);
        const bDate =
          typeof b?.createdAt === "string"
            ? new Date(b.createdAt)
            : b.createdAt instanceof Date
            ? b.createdAt
            : new Date(0);
        return aDate.getTime() - bDate.getTime();
      });
  };

  return (
    <>
      {rootComments?.map((comm: Comment) => (
        <SingleComment comment={comm} key={comm?._id} replies={getReplies(comm?._id)} canReply={canReply} />
      ))}
    </>
  );
};

export default CommentsList;
