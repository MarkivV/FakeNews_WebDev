import { FC, useState } from "react";
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

  const handleClick = (categ: string) => {
    setSelectedCateg(categ);
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
            </button>
          </Link>
        ))}
      </nav>
      <div className={styles.catTitle}>
        <h1>{newsTranslate(selectedCateg)}</h1>
      </div>
      <div className={styles.mainBlock}>
        {news.map((i: News) => (
          <div key={i._id} className={styles.normal_card}>
            <div className={styles.normal_card_img}>
              <Link href={"/news/" + i._id}>
                <img src={i?.image} alt="" />
              </Link>
              <div className={styles.desc}>
                <div className={styles.up_desc}>
                  <Link href={"/category/" + category}>
                    <h2>{newsTranslate(i.category)}</h2>
                  </Link>
                  <h2>| {moment(i.createdAt).format("LLL")}</h2>
                </div>
                <Link href={"/news/" + i._id}>
                  <h2>
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
  );
};
export default News;
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const res = await axios.get(
    "http://localhost:3000/api/category/" + params.category
  );
  return {
    props: {
      news: res?.data,
      category: params?.category,
    },
  };
};
