import React, { FC, useState } from "react";
import styles from "../styles/SingleComment.module.scss";
import { Comment } from "../types/types";
import moment from "moment";
import "moment/locale/uk";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DOMPurify from "isomorphic-dompurify";

type SingleComm = {
  comment: Comment;
  replies: Comment[];
  canReply: boolean;
  currentUserId?: string;
  commentDelete: (commId: string, e: any) => void;
  handleSubmitComment: (e: any, parentId: any) => void;
  setReply: (reply: string) => void;
  reply: string;
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
  const fiveMinutes = 3000000;
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

  let formattedText =
    "<p>" +
    DOMPurify.sanitize(comment?.body).replace(/\n/g, "</p><p>") +
    "</p>";

  return (
    <div className={styles.comment}>
      <AccountCircleIcon className={styles.avatar} />
      <div className={styles.commBody}>
        <div className={styles.commContent}>
          <div>
            <h4>{comment?.name}</h4>
            <h5>{moment(comment?.createdAt).format("LLL")}</h5>
          </div>
          {canDelete && (
            <div className={styles.commActions}>
              <h6
                onClick={(e) => comment?._id && commentDelete(comment?._id, e)}
              >
                <DeleteIcon className={styles.deleteButton} />
              </h6>
            </div>
          )}
        </div>
        <div
          className={styles.commentBody}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(formattedText),
          }}
        >
        </div>
        <div className={styles.commText}>
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
