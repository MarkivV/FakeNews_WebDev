import React, { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import styles from "../../styles/NewsCat.module.scss";
import { News } from "../../types/types";
import Link from "next/link";
import moment from "moment";
import "moment/locale/uk";
import { newsTranslate } from "../../utils/utilities";
import Image from "next/image"
import Head from "next/head";
import imageB from "../../assets/Brazhkovich.svg";
type NewsCat = {
    newsGetCategory: News[];
  category: string;

    lastFivePosts: News[];
};
export const list = [
  "Війна",
  "Політика",
  "Наука та Технології",
  "Світ",
  "Економіка",
];
export const listEng = [
  "war",
  "politic",
  "science",
  "world",
  "economy",
];
const NewsComponent: FC<NewsCat> = ({ newsGetCategory, category, lastFivePosts }) => {
  const [selectedCateg, setSelectedCateg] = useState(category);
  const [postsList, setPostsList] = useState<News[]>(newsGetCategory);
  const [lastPostsList] = useState<News[]>(lastFivePosts);
  const [page, setPage] = useState(1);
  const handleClick = async (categ: string) => {
    setSelectedCateg(categ);
    const getNextPosts = await axios.get(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/category/` + categ,
      {
        params: {
          page: 0,
        },
      }
    );
    setPostsList(getNextPosts.data.newsGetCategory);
  };
  return (
    <div className={styles.wrap}>
        <Head>
            <title>Бражкович | {newsTranslate(category)}</title>
            <meta property="og:url" content={`https://brazhkovich.com/category/${category}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`Бражкович | ${newsTranslate(category)}`} />
            <meta property="og:image" content={imageB} />
        </Head>
      <nav className={styles.categories}>
        {list.map((i: string, index) => (
          <Link href={"/category/" + listEng[index]} key={index}  prefetch={false}>
            <button
              className={styles.active}
              onClick={() => handleClick(listEng[index])}
            >
              <h2>{i}</h2>
              <p>/</p>
            </button>
          </Link>
        ))}
      </nav>
      <div className={styles.catTitle}>
        <h1>{newsTranslate(selectedCateg)}</h1>
      </div>
        <div className={styles.categoryBlocks}>

      <div className={styles.mainBlock}>
        {postsList.map((i: News) => (
          <div key={i.url} className={styles.normal_card}>
            <div className={styles.normal_card_img}>
              <Link href={"/news/" + i.url} prefetch={false}>
                  <Image
                      src={i?.image}
                      alt={i?.title}
                      width={400} height={300}
                  />
              </Link>
              <div className={styles.desc}>
                <div className={styles.up_desc}>
                  <Link href={"/category/" + category} prefetch={false}>
                    <h6>{newsTranslate(i.category)}</h6>
                  </Link>
                  <h6>| {moment(i.createdAt).format("LLL")}</h6>
                </div>
                <Link href={"/news/" + i.url} prefetch={false}>
                  <h2 className={styles.titleDesc}>
                    {i.title?.length > 150
                      ? `${i.title?.substring(0, 90)}...`
                      : i.title}
                  </h2>
                </Link>
              </div>
            </div>
            <div className={styles.normal_card_desc}>
              <h4>{moment(i.createdAt).format("LLL")}</h4>
            </div>
          </div>
        ))}

          <div className={styles.loadMoreButton}>
              <button
                  onClick={async () => {
                      setPage(page + 1);
                      console.log(page);

                      const getNextPosts = await axios.get(
                          `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/category/` + category,
                          {
                              params: {
                                  page: page,
                              },
                          }
                      );

                      setPostsList([...postsList, ...getNextPosts.data.newsGetCategory]);
                  }}
              >
                  Завантажити ще
              </button>
          </div>
      </div>
        <div className={styles.right_block}>
            <h1>Останні новини</h1>
            {lastPostsList.map((i: News) => (
                <div key={i.url} className={styles.normal_card}>
                    <div className={styles.normal_card_img}>
                        <Link href={"/news/" + i.url} prefetch={false}>
                            <Image
                                src={i?.image}
                                alt={i?.title}
                                width={400} height={300}
                            />
                        </Link>
                        <div className={styles.desc}>
                            <div className={styles.up_desc}>
                                <Link href={"/category/" + category} prefetch={false}>
                                    <h6>{newsTranslate(i.category)}</h6>
                                </Link>
                                <h6>| {moment(i.createdAt).format("LLL")}</h6>
                            </div>
                            <Link href={"/news/" + i.url} prefetch={false}>
                                <h2 className={styles.titleDesc}>
                                    {i.title?.length > 150
                                        ? `${i.title?.substring(0, 90)}...`
                                        : i.title}
                                </h2>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.normal_card_desc}>
                        <h4>{moment(i.createdAt).format("LLL")}</h4>
                    </div>
                </div>
            ))}
        </div>
        </div>
    </div>
  );
};
export default NewsComponent;
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  let res = null
  try{
    res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/category/${params.category}`,
       {
        params: {
          page: 0
        }
       }
    );
  }catch(err){
    console.log(err);
  }
  return {
    props: {
      newsGetCategory: res?.data.newsGetCategory,
      category: params?.category,
      lastFivePosts: res?.data.lastFivePosts.reverse()
    },
  };
};
