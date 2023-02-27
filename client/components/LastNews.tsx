import styles from "./../styles/LastNews.module.scss";
import { typeNews } from "../types/types";
import { FC } from "react";
import Link from "next/link";
import { newsTranslate } from "../utils/utilities";
const LastNews: FC<typeNews> = ({ items }) => {
  
  return (
    <div className={styles.lastNewsBlock}>
      <div className={styles.newsBlock}>
        {items.map((i) => (
          <div className={styles.lastNews_card} key={i?._id}>
            <div className={styles.lastNews_image}>
              <Link href={"/news/" + i?._id} passHref>
                <img
                  src={i?.image}
                  alt={i?.title}
                  width={1200}
                  height={960}
                  decoding={"async"}
                  loading={"eager"}
                  itemProp={"image"}
                />
              </Link>
            </div>
            <div className={styles.lastNews_content}>
              <Link href={"/news/" + i?._id}>
                <h3>
                  {i?.title.length > 110
                    ? `${i?.title.substring(0, 110)}...`
                    : i?.title}
                </h3>
              </Link>
              <Link href={`/category/${i?.category}?page=0`}>
                <h4>{newsTranslate(i?.category)}</h4>
              </Link>
              <Link href={"/news/" + i?._id}>
                <h2>
                  {i?.description.length > 330
                    ? `${i?.description.substring(0, 330)}...`
                    : i?.description}
                </h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LastNews;