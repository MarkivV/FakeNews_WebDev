import React from 'react';
import {News} from "../types";
import styles from './../styles/BigCard.module.scss'
import Link from "next/link";
import moment from "moment";
import 'moment/locale/uk';


const BigCard:React.FC<News> = ({_id, title, description, creator, tags, image, published, category, createdAt}) => {
    return (
        <div className={styles.card_wrap}>
            <div className={styles.Image}>
                <Link href={'/news/'+_id}>
                    <img src={image} alt=""/>
                </Link>
                <div className={styles.desc}>
                    <div className={styles.up_desc}>
                        <h2>Війна</h2>
                        <h3>| {moment(createdAt).format("LLL")}</h3>
                    </div>
                    <Link href={'/news/' + _id}>
                       <span>
                        {
                            title
                        }
                        </span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default BigCard;
