import styles from './../styles/NormalCard.module.scss'
import img from "./../assets/400_0_1662698694-6361.jpg"
import {News} from "../types/types";
import {FC} from "react";
import Link from 'next/link';

type NormalCard = {
    news: News
}

const NormalCard: FC<NormalCard> = ({news}) => {
    return (
        <div className={styles.normal_card}>
            <div className={styles.normal_card_img}>
                <img src={news?.image} alt=""/>
            </div>
            <div className={styles.normal_card_desc}>
                <Link href={'/news/'+news._id}>
                    <h2>{news.title?.length > 90 ? `${news.title?.substring(0, 90)}...` : news.title}</h2>
                    <span>{news.description?.length > 90 ? `${news.description?.substring(0, 90)}...` : news.description}</span>
                </Link>
            </div>
        </div>
    );
};

export default NormalCard;