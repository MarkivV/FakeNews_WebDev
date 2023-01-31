import React, { FC } from "react";
import styles from "../styles/SingleComment.module.scss";
import { Comment } from "../types/types";
import moment from "moment";
import "moment/locale/uk";

type SingleComm = {
  comment: Comment;
  replies: Comment[];
};

const SingleComment: FC<SingleComm> = ({ comment, replies }) => {
  console.log(replies);

  return (
    <div className={styles.comment}>
      <div className={styles.avatar} data-label={"DC"}></div>
      <div className={styles.commBody}>
        <div className={styles.commContent}>
          <h4>{comment?.name}</h4>
          <h5>{moment(comment?.createdAt).format("LLL")}</h5>
        </div>
        <div className={styles.commText}>
          <h4>{comment?.body}</h4>
          {replies?.length > 0 && (
            <div className={styles.replies}>
              {replies.map((rep) => (
                <SingleComment comment={rep} key={rep?._id} replies={[]} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
