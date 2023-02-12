import styles from "../styles/Home.module.scss";
import MainCard from "../components/MainCard";
import NormalCard from "../components/NormalCard";
import { News } from "../types/types";
import { GetStaticProps } from "next";
import axios from "axios";
import React from "react";
import { listEng } from "./category/[category]";
import dynamic from "next/dynamic"

const LastNews = dynamic(()=>import("../components/LastNews"))
const NewsBlock = dynamic(()=>import("../components/NewsBlock"))



type Props = {
  news: News[];
};

export default function Home({ news }: Props) {
  if (news.length === 0) {
    return "Наразі на сайті ведутся технічні роботи";
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.upper_block}>
        <div className={styles.leftBlock}>
          <NormalCard news={news[1]} />
          <NormalCard news={news[2]} />
        </div>
        <div className={styles.middleBlock}>
          <MainCard news={news[0]} />
        </div>
        <div className={styles.rightBlock}>
          <NormalCard news={news[3]} />
          <NormalCard news={news[4]} />
        </div>
      </div>
      <hr className={styles.hrHome} />
      <div className={styles.titlePopular}>
        <h1>Вибір редакції</h1>
      </div>
      <div className={styles.lastNewsBlock}>
        <div className={styles.lastNews}>
          <LastNews items={news} />
        </div>
      </div>
      <hr className={styles.hrHome2} />
      <div className={styles.newsBlock}>
        {listEng.map((category, index) => (
          <NewsBlock news={news} key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("http://localhost:3000/api/news");
  return {
    props: {
      news: res?.data,
    },
  };
};
