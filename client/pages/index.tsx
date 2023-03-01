import styles from "../styles/Home.module.scss";
import MainCard from "../components/MainCard";
// import LastNews from "../components/LastNews";
// import NewsBlock from "../components/NewsBlock";
import NormalCard from "../components/NormalCard";
import { News } from "../types/types";
import { GetServerSideProps } from "next";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { listEng } from "./category/[category]";
import dynamic from "next/dynamic";

const LastNews = dynamic(() => import("../components/LastNews"), { ssr: false });
const NewsBlock = dynamic(() => import("../components/NewsBlock"), { ssr: false });
type Props = {
  lastFivePosts: News[];
  topThreeRatedPosts: News[];
  postsByCategory: News[];
};
// {lastFivePosts, topThreeRatedPosts, postsByCategory}: Props
export default function Home({lastFivePosts, topThreeRatedPosts, postsByCategory}: Props) {
  // console.log(postsByCategory)
  // const [lastFivePosts, setLastFivePosts] = useState<News[]>();
  // const [topThreeRatedPosts, setTopThreeRatedPosts] = useState<News[]>();
  // const [postsByCategory, setPostsByCategory] = useState<News[]>();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   Promise.all([
  //     fetchLastFivePosts(),
  //     fetchTopThreeRatedPosts(),
  //     fetchPostsByCategory(),
  //   ]).then(([lastFivePosts, topThreeRatedPosts, postsByCategory]) => {
  //     setLastFivePosts(lastFivePosts);
  //     setTopThreeRatedPosts(topThreeRatedPosts);
  //     setPostsByCategory(postsByCategory);
  //     setLoading(false);
  //   });
  // }, []);

  if (!lastFivePosts && !topThreeRatedPosts) {
    return <div>Ведутся технічні роботи</div>;
  }
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // @ts-ignore
  // @ts-ignore
  return (
    <div className={styles.wrap}>
      <div className={styles.upper_block}>
        <div className={styles.leftBlock}>
          <NormalCard news={lastFivePosts[1]} />
          <NormalCard news={lastFivePosts[2]} />
        </div>
        <div className={styles.middleBlock}>
          <MainCard news={lastFivePosts[0]} />
        </div>
        <div className={styles.rightBlock}>
          <NormalCard news={lastFivePosts[3]} />
          <NormalCard news={lastFivePosts[4]} />
        </div>
      </div>
      <hr className={styles.hrHome} />
      <div className={styles.titlePopular}>
        <h1>Вибір редакції</h1>
        <span>
          Тут ми зібрали три найкращі новини за останній час на розсуд нашої
          редакції. Наші журналісти працюють наполегливо, щоб надавати вам
          найактуальнішу та найцікавішу інформацію з усього світу.
        </span>
      </div>
      <div className={styles.lastNewsBlock}>
        <div className={styles.lastNews}>
          <LastNews items={topThreeRatedPosts} />
        </div>
      </div>
      <div className={styles.newsBlock}>
        {listEng.map((category, index) => (
          <NewsBlock news={postsByCategory} key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let res = null;
  try {
    res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/news`
    );
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      lastFivePosts: res?.data.lastFivePosts,
      topThreeRatedPosts: res?.data.topThreeRatedPosts,
      postsByCategory: res?.data.postsByCategory,
    },
  };
};
