import {FC} from 'react';
import styles from "./../styles/SmallCard.module.scss"
import Link from "next/link";
import {newsTranslate} from "../utils/utilities";
type LastNews = {
    id: string;
    title: string;
    img: string
    category: string
}
const SmallCard: FC<LastNews> = ({id,title, img, category}) => {
    return (
        <div className={styles.lastNews_card}>
            <Link href={'/news/'+id} className={styles.lastNews_card_img} passHref>
                <img src={img} alt=""/>
                <h4>{newsTranslate(category)}</h4>
                <h3>{title.length > 110 ? `${title.substring(0, 110)}...` : title}</h3>
            </Link>
        </div>
    );
};

export default SmallCard;
