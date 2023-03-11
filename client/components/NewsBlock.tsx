import Link from "next/link";
import { News } from "../types/types";
import styles from "./../styles/NewsBlock.module.scss";
import { FC } from "react";
import { newsTranslate } from "../utils/utilities";
import moment from "moment";
import "moment/locale/uk";
import Image from "next/image"
import plainColor from "../assets/dadada.png"

type NewsBlock = {
  news: News[];
  category: string;
};
const NewsBlockComponent: FC<NewsBlock> = ({ news, category }) => {
  return (
    <>
      <div className={styles.fist_part}>
        <Link href={"/category/" + category} prefetch={false}>
          <h1>{newsTranslate(category)}</h1>
        </Link>
      </div>
      <div className={styles.second_part}>
        {news
          .filter((cat) => cat.category === category)
          .slice(0, 10)
          .map((i) => (
            <div key={i.url} className={styles.normal_card}>
              <div className={styles.normal_card_img}>
                <Link href={"/news/" + i.url} prefetch={false}>
                  <Image
                  src={i?.image || plainColor}
                  alt={i?.title}
                  width={700}
                  height={200}
                  loading={"lazy"}
                  />
                  {/* <img  alt="" /> */}
                </Link>
                <div className={styles.normal_card_desc}>
                  <div className={styles.up_desc}>
                    <Link href={"/category/" + category} prefetch={false}>
                      <h2>{newsTranslate(i.category)}</h2>
                    </Link>
                  </div>
                  <div className={styles.titleDiv}>
                  <Link href={"/news/" + i.url} prefetch={false}>
                    <h2>{i.title}</h2>
                  </Link>
                  </div>
                </div>
              </div>
              <div className={styles.up_descDown}>
                <h4>{moment(i.createdAt).format("LLL")}</h4>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default NewsBlockComponent;


