import React, { FC } from "react";
import styles from "../styles/SingleComment.module.scss";
import { Comment } from "../types/types";
import moment from "moment";
import "moment/locale/uk";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


type SingleComm = {
  comment: Comment;
  replies: Comment[];
  canReply: boolean;
};

const SingleComment: FC<SingleComm> = ({ comment, replies, canReply }) => {
    console.log(canReply);
    

  return (
    <div className={styles.comment}>
      <AccountCircleIcon/>
      <div className={styles.commBody}>
        <div className={styles.commContent}>
          <h4>{comment?.name}</h4>
          <h5>{moment(comment?.createdAt).format("LLL")}</h5>
        </div>
        <div className={styles.commText}>
          <h4>{comment?.body}</h4>
          {
            canReply && (
                <div className={styles.commActions}>
                <h6>Відповісти</h6>
              </div>
            )
          }
          {replies?.length > 0 && (
            <div className={styles.replies}>
              {replies.map((rep) => (
                <SingleComment comment={rep} key={rep?._id} replies={[]} canReply={false}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
