import styles from "./../../styles/CardDetails.module.scss";
import axios from "axios";
import { GetServerSideProps } from "next";
import { News, Comment } from "../../types/types";
import { FC, useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import Link from "next/link";
import { newsTranslate } from "../../utils/utilities";
import { toastProps } from "../login";
import Alerts from "../../components/Alerts";
import { useSession } from "next-auth/react";
import CommentsList from "../../components/CommentsList";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import DOMPurify from "isomorphic-dompurify";
import Head from "next/head";
type Details = {
  mainPost: News;
  posts: News[];
  name: string;
  comments: Comment[];
};
const CardDetails: FC<Details> = ({ mainPost, posts, name, comments }) => {
  const { data: session, status } = useSession();
  const [commentsList, setCommentsList] = useState(comments);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("")
  const [postId] = useState(mainPost?._id);
  const [alertList, setAlertList] = useState<toastProps[]>([]);

  let toastProp = null;
  let formattedText =
    "<p>" +
    DOMPurify.sanitize(mainPost?.description).replace(/\n/g, "</p><p>") +
    "</p>";

  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);
  const commentDelete = async (commId: string, e: any) => {
    e.preventDefault();
    if (commId) {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/comments/` + commId
      );
      if (res.status === 201) {
        toastProp = {
          id: alertList.length + 1,
          title: "Виконано",
          description: "Видалення пройшло успішно",
          bgColor: "#009216",
        };
        setAlertList([...alertList, toastProp]);
        setCommentsList(
          commentsList.filter((comments) => comments._id !== commId)
        );
      } else {
        toastProp = {
          id: alertList.length + 1,
          title: "Помилка",
          description: "Сталась невідома помилка",
          bgColor: "#ff9900",
        };
        setAlertList([...alertList, toastProp]);
      }
    }
  };

  const handleSubmitComment = async (e: any, parentId: any) => {
    e.preventDefault();
    if (comment || reply) {
      await axios
        .post<Comment, Comment>(`${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/comments`, {
          body: comment === "" ? reply : comment,
          userId: session?.user?.id,
          parentId,
          postId,
          name: session?.user?.name,
        })
        .then((commentThen) => {
          setCommentsList([commentThen.data, ...commentsList]);
          setComment("");
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

  const canReply = () => {
    return !(status === "loading" || status === "unauthenticated");
  };

  return (
    <div className={styles.cardDetails_wrap}>
      <Head>
        <title>Бражкович | {mainPost?.title}</title>
        <meta property="og:url" content={`https://brazhkovich.vercel.app/news/${mainPost?._id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={mainPost?.title} />
        <meta
            property="og:description"
            content={mainPost?.description}
        />
        <meta property="og:image" content={mainPost?.image} />
      </Head>
      <div className={styles.wrapperMain}>
        <div className={styles.cardDetails_title}>
          <h1>{mainPost?.title}</h1>
        </div>
        <div>
          <div className={styles.underImageBlock}>
            <div className={styles.creator}>
              <div className={styles.creatorName}>
              <h2>Від: </h2>
              <h3>{name}</h3>
              </div>
              <h4>{moment(mainPost.createdAt).format("LLL")}</h4>
            </div>
          </div>
        </div>
        <div className={styles.cardDetails_image}>
          <img src={mainPost?.image} alt="" />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.cardDetails_leftBlock}>
            <div
              className={styles.cardDetails_description}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(formattedText),
              }}
            >
            </div>

            <div className={styles.cardDetails_otherInfo}>
              <h3>
                Всі дописи на цьому ресурсі мають виключно сатиричний характер і
                не є реальними новинами
              </h3>
              <div className={styles.otherInfoDiv}>
                <h2>Поширити:</h2>
                <TelegramIcon style={{ color: "#0088CC", cursor: "pointer" }} />
                <InstagramIcon style={{ cursor: "pointer" }} />
                <FacebookIcon style={{ color: "#4267B2", cursor: "pointer" }} />
                <TwitterIcon style={{ color: "#1DA1F2", cursor: "pointer" }} />
              </div>
            </div>
            <div className={styles.comments}>
              <div className={styles.commentsTitle}>
                <h3>Коментарі</h3>
              </div>
              {session && (
                <div className={styles.commentInputDiv}>
                  <input
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className={styles.commentInput}
                    type="text"
                    placeholder={"Залишити коментар"}
                  />
                  <button
                    onClick={(e) => handleSubmitComment(e, null)}
                    className={styles.button}
                  >
                    <h3>Відправити</h3>
                  </button>
                </div>
              )}

              <div className={styles.commList}>
                <CommentsList
                  comments={commentsList}
                  canReply={canReply()}
                  currentUserId={session?.user?.id}
                  commentDelete={commentDelete}
                  handleSubmitComment={handleSubmitComment}
                  setReply={setReply}
                  reply={reply}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right_block}>
        <div className={styles.title_rb}>
          <h2>Інше від цього автора</h2>
        </div>
        <div className={styles.cards}>
          {posts
            .filter((post) => post._id !== mainPost?._id)
            .slice(0, 3)
            .map((post) => (
              <div className={styles.card} key={post?._id}>
                <div className={styles.upperPart}>
                  <Link href={"/news/" + post?._id}>
                    <img src={post?.image} alt="" />
                  </Link>
                </div>
                <div className={styles.bottomPart}>
                  <Link href={`/category/${post?.category}?page=0`}>
                    <h2>{newsTranslate(post?.category)}</h2>
                  </Link>
                  <Link href={"/news/" + post?._id}>
                    <h3>{post?.title}</h3>
                  </Link>
                </div>
              </div>
            ))}
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

  let res = null
  let comments = null

  try{
     res = await axios.get(`${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/news/${params.id}`);
     comments = await axios.get(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/comments/${res.data.post._id}`
    );
  }catch(err){
    console.log(err);
  }
  
  return {
    props: {
      mainPost: res?.data?.post,
      posts: res?.data?.posts,
      name: res?.data?.userName,
      comments: comments?.data,
    },
  };
};

export default CardDetails;
