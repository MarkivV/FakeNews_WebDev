import React, { FC, useState } from "react";
import styles from "../styles/SingleComment.module.scss";
import { Comment } from "../types/types";
import moment from "moment";
import "moment/locale/uk";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type SingleComm = {
  comment: Comment;
  replies: Comment[];
  canReply: boolean;
  currentUserId?: string;
  commentDelete: (commId: string, e: any) => void;
  handleSubmitComment: (e: any, parentId: any) => void;
  setReply: (reply: string) => void;
  reply: string;

  // handleReply: (comm: string, parId: string, e: InputEvent) => void;
};
const SingleComment: FC<SingleComm> = ({
  comment,
  replies,
  canReply,
  currentUserId,
  commentDelete,
  handleSubmitComment,
  setReply,
  reply,
}) => {
  console.log(canReply);
  const [replyWindow, setReplyWindow] = useState(false);
  const fiveMinutes = 300000;
  const createdAt = comment?.createdAt
    ? new Date(comment.createdAt)
    : undefined;
  const timePassed: boolean = createdAt
    ? new Date().getTime() - createdAt.getTime() > fiveMinutes
    : false;
  const canDelete = currentUserId === comment.userId && !timePassed;

  const handleSendReply = async (comId: string, e: any) => {
    e.preventDefault();
    handleSubmitComment(e, comId);
    setReplyWindow(false);
  };

  return (
    <div className={styles.comment}>
      <AccountCircleIcon />
      <div className={styles.commBody}>
        <div className={styles.commContent}>
          <h4>{comment?.name}</h4>
          <h5>{moment(comment?.createdAt).format("LLL")}</h5>
        </div>
        <div className={styles.commText}>
          <h4>{comment?.body}</h4>
          {canReply && (
            <>
              {replyWindow === false && (
                <div className={styles.commActions}>
                  <h6 onClick={() => setReplyWindow(true)}>Відповісти</h6>
                </div>
              )}
              {replyWindow && (
                <div className={styles.replyBlock}>
                  <input
                    onChange={(e) => setReply(e.target.value)}
                    value={reply}
                    className={styles.commentInput}
                    type="text"
                    placeholder={"Залишити коментар"}
                  />
                  <div className={styles.buttonBlock}>
                    <button
                      onClick={(e) =>
                        comment?._id && handleSendReply(comment?._id, e)
                      }
                    >
                      Відправити
                    </button>
                    <button onClick={() => setReplyWindow(false)}>
                      Відмінити
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {canDelete && (
            <div className={styles.commActions}>
              <h6
                onClick={(e) => comment?._id && commentDelete(comment?._id, e)}
              >
                Видалити
              </h6>
            </div>
          )}
          {replies?.length > 0 && (
            <div className={styles.replies}>
              {replies.map((rep) => (
                <SingleComment
                  comment={rep}
                  key={rep?._id}
                  replies={[]}
                  canReply={false}
                  currentUserId={currentUserId}
                  commentDelete={commentDelete}
                  handleSubmitComment={handleSubmitComment}
                  setReply={setReply}
                  reply={reply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
