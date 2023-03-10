import styles from "../styles/Home.module.scss";
import MainCard from "../components/MainCard";
import imageB from "./../assets/Brazhkovich2.svg"
import NormalCard from "../components/NormalCard";
import { News } from "../types/types";
import { GetServerSideProps } from "next";
import axios from "axios";
import React from "react";
import { listEng } from "./category/[category]";
import dynamic from "next/dynamic";
import Head from "next/head";

const LastNews = dynamic(() => import("../components/LastNews"), { ssr: false });
const NewsBlock = dynamic(() => import("../components/NewsBlock"), { ssr: false });
type Props = {
  lastFivePosts: News[];
  topThreeRatedPosts: News[];
  postsByCategory: News[];
};
export default function Home({lastFivePosts, topThreeRatedPosts, postsByCategory}: Props) {

  if (!lastFivePosts && !topThreeRatedPosts) {
    return(
        <div className={styles.noDataPlaceholder}>
          <div>
            Сайт тимчасово не працює
          </div>
        </div>
    )
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <div className={styles.wrap}>
        <Head>
            <title>Бражкович</title>
            <meta property="og:url" content={`https://brazhkovich.com`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={"Новини які приголомшують"} />
            <meta property="og:image" content={imageB} />
        </Head>
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
