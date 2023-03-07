import styles from "./../styles/MainCard.module.scss";
import { News } from "../types/types";
import Link from "next/link";
import { newsTranslate } from "../utils/utilities";
import Image from "next/image"
import plainColor from "../assets/dadada.png"

type NewsProp = {
  news: News;
};
const MainCard = ({ news }: NewsProp) => {
  return (
    <div className={styles.wrap}>
      <figure className={styles.imgDiv}>
        <Link href={"/news/" + news?.url}>
          <Image
          src={news?.image || plainColor}
          alt={news?.title}
          width={1000}
          height={500}
          />
        </Link>
      </figure>
      <div className={styles.descDiv}>
        <div className={styles.categoryTitle}>
          <Link href={`/category/${news?.category}?page=0`}>
            <h3>{newsTranslate(news?.category)}</h3>
          </Link>
        </div>
        <div className={styles.titleDiv}>
          <Link href={"/news/" + news?.url}>
            <h2>{news?.title}</h2>
          </Link>
        </div>
        <div className={styles.readMore}>
          <Link href={"/news/" + news?.url}>
            <h5>Читати далі</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MainCard;