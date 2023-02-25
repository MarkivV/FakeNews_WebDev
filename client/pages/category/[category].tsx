import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import styles from "../../styles/NewsCat.module.scss";
import { News } from "../../types/types";
import Link from "next/link";
import moment from "moment";
import "moment/locale/uk";
import { newsTranslate } from "../../utils/utilities";
type NewsCat = {
  news: News[];
  category: string;
};
export const list = [
  "Війна",
  "Політика",
  "Наука та Технології",
  "Шоу-бізнес",
  "Україна",
  "Світ",
  "Економіка",
];
export const listEng = [
  "war",
  "politic",
  "science",
  "show-business",
  "Ukraine",
  "World",
  "economy",
];
const News: FC<NewsCat> = ({ news, category }) => {
  const [selectedCateg, setSelectedCateg] = useState(category);
  const [postsList, setPostsList] = useState<News[]>(news);
  const [page, setPage] = useState(1);
  
  // useEffect(() => {
  //   setPostsList(news)
  // }, [news])
  

  const handleClick = async (categ: string) => {
    setSelectedCateg(categ);
    const getNextPosts = await axios.get(
      "http://localhost:3000/api/category/" + categ,
      {
        params: {
          page: 0,
        },
      }
    );
    setPostsList(getNextPosts.data);
  };
  return (
    <div className={styles.wrap}>
      <nav className={styles.categories}>
        {list.map((i: string, index) => (
          <Link href={"/category/" + listEng[index]} key={index}>
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
      <div className={styles.mainBlock}>
        {postsList.map((i: News) => (
          <div key={i._id} className={styles.normal_card}>
            <div className={styles.normal_card_img}>
              <Link href={"/news/" + i._id}>
                <img src={i?.image} alt="" />
              </Link>
              <div className={styles.desc}>
                <div className={styles.up_desc}>
                  <Link href={"/category/" + category}>
                    <h6>{newsTranslate(i.category)}</h6>
                  </Link>
                  <h6>| {moment(i.createdAt).format("LLL")}</h6>
                </div>
                <Link href={"/news/" + i._id}>
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
      <div className={styles.loadMoreButton}>
          <button
            onClick={async () => {
              setPage(page + 1);
              console.log(page);

              const getNextPosts = await axios.get(
                "http://localhost:3000/api/category/" + category,
                {
                  params: {
                    page: page,
                  },
                }
              );

              setPostsList([...postsList, ...getNextPosts.data]);
            }}
          >
            Завантажити ще
          </button>
        </div>
    </div>
  );
};
export default News;
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const res = await axios.get(
    `http://localhost:3000/api/category/${params.category}`,
     {
      params: {
        page: 0
      }
     }
  );
  return {
    props: {
      news: res?.data,
      category: params?.category,
    },
  };
};
