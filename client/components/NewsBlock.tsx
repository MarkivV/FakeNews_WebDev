import React from 'react';
import Link from "next/link";
import {News} from "../types/types";
import styles from "./../styles/NewsBlock.module.scss"

type NewsBlock = {
    news: News[],
    category: string
}

const NewsBlock = ({news, category}: NewsBlock) => {
    return (
        <>
            <div className={styles.fist_part}>
                <Link href={"/category/"+category}>
                    <h2>{category}</h2>
                </Link>
            </div>
            <div className={styles.second_part}>
                {
                    news.filter(cat => cat.category === category).slice(0,10).map((i)=>(
                        <div key={i._id} className={styles.normal_card}>
                            <div className={styles.normal_card_img}>
                                <Link href={'/news/'+i._id}>
                                    <img src={i?.image} alt=""/>
                                </Link>
                            </div>
                            <div className={styles.normal_card_desc}>
                                <Link href={'/news/'+i._id}>
                                    <h2>{i.title}</h2>
                                    {/*<span>{i.description?.length > 120 ? `${i.description?.substring(0, 120)}...` : i.description}</span>*/}
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default NewsBlock;
