import { FC } from "react";
import styles from "./../styles/SmallCard.module.scss";
import Link from "next/link";
import { newsTranslate } from "../utils/utilities";
import {News} from "../types/types";
type LastNews = {
    item: News;
};
const SmallCard: FC<LastNews> = ({ item }) => {
  return (
    <div className={styles.lastNews_card}>
      <div className={styles.lastNews_image}>
        <Link href={"/news/" + item?._id} passHref>
          <img
            src={item?.image}
            alt={item?.title}
            width={1200}
            height={960}
            decoding={"async"}
            loading={"eager"}
            itemProp={"image"}
          />

        </Link>
      </div>
      <div className={styles.lastNews_content}>
        <h4>{newsTranslate(item?.category)}</h4>
        <h3>{item?.title.length > 110 ? `${item?.title.substring(0, 110)}...` : item?.title}</h3>
        <h2>{item?.description.length > 300 ? `${item?.description.substring(0, 300)}...` : item?.description}</h2>
      </div>
    </div>
  );
};
export default SmallCard;
