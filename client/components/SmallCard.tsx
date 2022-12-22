import React, {FC} from 'react';
import styles from "./../styles/SmallCard.module.scss"
import Link from "next/link";
type LastNews = {
    id: string;
    title: string;
    img: string
}
const SmallCard: FC<LastNews> = ({id,title, img}) => {
    return (
        <div className={styles.lastNews_card}>
            <Link href={'/news/'+id} className={styles.lastNews_card_img} passHref>
                <img src={img} alt=""/>
                <span>{title.length > 90 ? `${title.substring(0, 90)}...` : title}</span>
            </Link>
        </div>
    );
};

export default SmallCard;
