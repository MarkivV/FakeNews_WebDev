import styles from "./../../styles/CardDetails.module.scss";
import axios from "axios";
import { GetServerSideProps } from "next";
import { News, Comment } from "../../types/types";
import { FC, useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import Link from "next/link";
import { newsTranslate } from "../../utils/utilities";
import SmallCard from "../../components/SmallCard";
import { toastProps } from "../login";
import Alerts from "../../components/Alerts";
import { useSession } from "next-auth/react";
import CommentsList from "../../components/CommentsList";

type Details = {
  mainPost: News;
  posts: News[];
  name: string;
  comments: Comment[];
};

const CardDetails: FC<Details> = ({ mainPost, posts, name, comments }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [parentId] = useState(null);
  const [postId] = useState(mainPost?._id);
  const [commentsList, setCommentsList] = useState(comments);
  const [alertList, setAlertList] = useState<toastProps[]>([]);
  let toastProp = null;

  const handleSubmitComment = async (e: any) => {
    e.preventDefault();

    if (comment) {
      await axios
        .post<Comment, Comment>("http://localhost:3000/api/comments", {
          body: comment,
          userId: session?.user?.id,
          parentId,
          postId,
          name: session?.user?.name,
        })
        .then((comment) => {
          setCommentsList([comment, ...commentsList])
          setComment("")
        });
    } else {
      toastProp = {
        id: alertList.length + 1,
        title: "Увага",
        description: "Заповніть всі поля",
        bgColor: "#FF4F00",
      };
      setAlertList([...alertList, toastProp]);
    }
  };

  return (
    <div className={styles.cardDetails_wrap}>
      <div className={styles.upperBlock}>
        <div className={styles.cardDetails_title}>
          <h1>{mainPost?.title}</h1>
          <Link href={"/category/" + mainPost.category}>
            <div className={styles.cardDetails_CategoryBadge}>
              <h2>{newsTranslate(mainPost.category)}</h2>
            </div>
          </Link>
        </div>
        <div className={styles.cardDetails_image}>
          <img src={mainPost?.image} alt="" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.cardDetails_leftBlock}>
          <div className={styles.underImageBlock}>
            <div className={styles.creator}>
              <h3>Автор: </h3>
              <h3>{name}</h3>
            </div>
            <div className={styles.cardDetails_dateTime}>
              <h3>{moment(mainPost.createdAt).format("LLL")}</h3>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.cardDetails_description}>
            <span>{mainPost?.description}</span>
          </div>

          <div className={styles.cardDetails_otherInfo}>
            <h3>Читайте нас у: </h3>
            <h2>
              <a href="https://t.me/brazhkovich">Telegram</a>
            </h2>
          </div>
          <hr className={styles.hr} />
          <div className={styles.cardDetails_tags}>
            <div className={styles.cardDetails_tagsBadge}>
              <h3>Теги:</h3>
              {mainPost.tags.map((i, index) => (
                <h2 key={index}>{i}</h2>
              ))}
            </div>
          </div>
          <div className={styles.comments}>
            <div className={styles.commentsTitle}>
              <h3>Коментарі</h3>
            </div>
            <div className={styles.commentInputDiv}>
              <input
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                className={styles.commentInput}
                type="text"
                placeholder={"Залишити коментар"}
              />

              <button
                disabled={!session}
                onClick={(e) => handleSubmitComment(e)}
              >
                <h3>Відправити</h3>
              </button>
            </div>
            <div className={styles.commList}>
              <CommentsList commentsList={commentsList} />
            </div>
          </div>
        </div>
        <div className={styles.right_block}>
          <div className={styles.title_rb}>
            <h2>Інше від цього автора</h2>
          </div>
          <div className={styles.cards}>
            {posts.slice(0, 5).map((post) => (
              <div className={styles.card} key={post?._id}>
                <SmallCard
                  category={post?.category}
                  id={post?._id}
                  img={post?.image}
                  title={post?.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Alerts
        toastList={alertList}
        position={"bottom-right"}
        setAlertList={setAlertList}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const res = await axios.get(`http://localhost:3000/api/news/${params.id}`);
  const comments = await axios.get(
    `http://localhost:3000/api/comments/${params.id}`
  );
  return {
    props: {
      mainPost: res.data.post,
      posts: res.data.posts,
      name: res.data.userName,
      comments: comments.data,
    },
  };
};

export default CardDetails;
