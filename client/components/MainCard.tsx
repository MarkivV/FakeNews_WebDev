import styles from "./../styles/MainCard.module.scss";
import { News } from "../types/types";
import Link from "next/link";
import { newsTranslate } from "../utils/utilities";
type NewsProp = {
  news: News;
};
const MainCard = ({ news }: NewsProp) => {
  return (
    <div className={styles.wrap}>
      <figure className={styles.imgDiv}>
        <Link href={"/news/" + news?._id}>
          <img
            src={news?.image}
            alt={news?.title}
            width={1200}
            height={960}
            decoding={"async"}
            loading={"eager"}
            itemProp={"image"}
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
          <Link href={"/news/" + news?._id}>
            <h2>{news?.title}</h2>
          </Link>
        </div>
        <div className={styles.readMore}>
          <Link href={"/news/" + news?._id}>
            <h5>Читати далі</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MainCard;