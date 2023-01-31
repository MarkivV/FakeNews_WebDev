import React, { FC } from "react";
import { Comment } from "../types/types";
import styles from "../styles/CommentsList.module.scss";
import SingleComment from "./SingleComment";

type CommentsComponent = {
  commentsList: Comment[];
};

const CommentsList: FC<CommentsComponent> = ({ commentsList }) => {
  const rootComments = commentsList.filter((comm) => comm?.parentId === null);

  // const getReplies = commentId => {
  //   return commentsList.filter((comm)=> comm.parentId === commentId).sort((a,b)=> new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime())
  // }

  const getReplies = (commentId: any) => {
    //ts-ignore
    return commentsList
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
        <SingleComment comment={comm} key={comm?._id} replies={getReplies(comm?._id)}/>
      ))}
    </>
  );
};

export default CommentsList;

// const getReplies = (commentId : any) => {
//   //ts-ignore
//   return commentsList
//     .filter((comm) => comm?.parentId === commentId)
//     .sort((a, b) => {
//       const aDate =
//         typeof a?.createdAt === "string"
//           ? new Date(a.createdAt)
//           : a.createdAt instanceof Date
//           ? a.createdAt
//           : new Date(0);
//       const bDate =
//         typeof b?.createdAt === "string"
//           ? new Date(b.createdAt)
//           : b.createdAt instanceof Date
//           ? b.createdAt
//           : new Date(0);
//       return aDate.getTime() - bDate.getTime();
//     });
// };
