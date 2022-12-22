import styles from './../../styles/CardDetails.module.scss'
import Image from "next/image";
import axios from "axios";
import {GetServerSideProps } from 'next'
import {News} from "../../types";
import {FC} from "react";

type Details = {
    news: News
}

const CardDetails: FC<Details> = ({news}) => {
    return (
        <div className={styles.cardDetails_wrap}>
            <div className={styles.cardDetails_leftBlock}>
                <div className={styles.cardDetails_title}>
                    <h1>{news?.title}</h1>
                    <div className={styles.cardDetails_CategoryBadge}>
                        <h2>Війна</h2>
                    </div>
                    <div className={styles.cardDetails_dateTime}>
                        <h3>19 грудня 2022 | 15:46</h3>
                    </div>
                </div>
                <div className={styles.cardDetails_image}>
                    <img src={news?.image} alt=""/>
                </div>
                <div className={styles.cardDetails_description}>
                    <span>
                        {news?.description}
                    </span>
                </div>

                <div className={styles.cardDetails_otherInfo}>
                    <h2>Читайте нас у: </h2>
                    <h2><a href="https://t.me/brazhkovich">Telegram</a></h2>
                </div>
                <hr/>
                <div className={styles.cardDetails_tags}>
                    <h2>Теги:</h2>
                    <div className={styles.cardDetails_tagsBadge}>
                        <h2>Війна</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
    console.log(params)
    const res = await axios.get(
        `http://localhost:3000/api/news/${params.id}`
    );
    return {
        props: {
            news: res.data,
        },
    };
};

export default CardDetails;
