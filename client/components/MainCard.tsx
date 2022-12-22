import image from './../assets/photo_2022-09-03 11.53.37.jpeg'
import Image from "next/image";
import styles from './../styles/MainCard.module.scss'
import {News} from "../types";
import {FC} from "react";
import Link from "next/link";


type NewsProp = {
    news: News
}

const MainCard = ({news}: NewsProp) => {
    // console.log(typeof news[1].image)
    return (
        <div className={styles.wrap}>
            <div className={styles.imgDiv}>
                <Link href={'/news/' + news.id}>
                    <img src={news?.image} alt=""/>
                </Link>
            </div>
            <div className={styles.descDiv}>
                <Link href={'/news/' + news.id}>
                    <h2>{news?.title}</h2>
                </Link>
                <Link href={'/news/' + news.id}>
                    <span>{news?.description}</span>
                </Link>

            </div>
        </div>
    );
};

export default MainCard;
