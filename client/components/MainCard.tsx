import styles from './../styles/MainCard.module.scss'
import {News} from "../types/types";
import Link from "next/link";


type NewsProp = {
    news: News
}

const MainCard = ({news}: NewsProp) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.imgDiv}>
                <Link href={'/news/' + news._id}>
                    <img src={news?.image} alt=""/>
                </Link>
            </div>
            <div className={styles.descDiv}>
                <Link href={'/news/' + news._id}>
                    <h2>{news?.title}</h2>
                </Link>
                <Link href={'/news/' + news._id}>
                    <span>{news?.description.length > 150 ? `${news?.description.substring(0, 150)}...` : news?.description}</span>
                </Link>

            </div>
        </div>
    );
};

export default MainCard;
