import styles from './../styles/NormalCard.module.scss'
import {News} from "../types/types";
import {FC} from "react";
import Link from 'next/link';
import moment from "moment";
import "moment/locale/uk";
import Image from "next/image"
import plainColor from "../assets/dadada.png"

type NormalCardType = {
    news: News
}
const NormalCard: FC<NormalCardType> = ({news}) => {
    return (
        <div className={styles.normal_card}>
            <figure className={styles.normal_card_img}>

                <Image
                src={news?.image || plainColor}
                alt={news?.title}
                width={400} height={300}
                loading={"lazy"}
                />
                {/* <img src={news?.image} alt={news?.title} width={1200} height={960} decoding={"async"} loading={"eager"} itemProp={"image"}  /> */}
            </figure>
            <div className={styles.normal_card_desc}>
                <Link href={'/news/'+news?._id}>
                    <h3>{news?.title?.length > 90 ? `${news?.title?.substring(0, 90)}...` : news?.title}</h3>
                    <h4>{moment(news?.createdAt).format("LLL")}</h4>
                </Link>
            </div>
        </div>
    );
};
export default NormalCard;