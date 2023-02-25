import styles from './../styles/NormalCard.module.scss'
import {News} from "../types/types";
import {FC} from "react";
import Link from 'next/link';
import moment from "moment";
import "moment/locale/uk";

type NormalCardType = {
    news: News
}
const NormalCard: FC<NormalCardType> = ({news}) => {
    return (
        <div className={styles.normal_card}>
            <figure className={styles.normal_card_img}>
                <img src={news?.image} alt={news?.title} width={1200} height={960} decoding={"async"} loading={"eager"} itemProp={"image"}  />
            </figure>
            <div className={styles.normal_card_desc}>
                <Link href={'/news/'+news?._id}>
                    <h3>{news?.title?.length > 90 ? `${news?.title?.substring(0, 90)}...` : news?.title}</h3>
                    {/* <span>{news?.description?.length > 90 ? `${news?.description?.substring(0, 90)}...` : news?.description}</span> */}
                    <h4>{moment(news?.createdAt).format("LLL")}</h4>
                </Link>
            </div>
        </div>
    );
};
export default NormalCard;