import React from 'react';
import {News} from "../types";
import styles from './../styles/BigCard.module.scss'
import Link from "next/link";


const BigCard:React.FC<News> = ({id, title, description, creator, tags, image, published, category}) => {
    return (
        <div className={styles.card_wrap}>
            <div className={styles.Image}>
                <Link href={'/news/'+id}>
                    <img src={image} alt=""/>
                </Link>
                <div className={styles.desc}>
                    <div className={styles.up_desc}>
                        <h2>Війна</h2>
                        <h3>| 8 листопада 12:45</h3>
                    </div>
                    <Link href={'/news/' + id}>
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
