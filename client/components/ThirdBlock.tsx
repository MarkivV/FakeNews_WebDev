import React from 'react';
import SmallCard from "./SmallCard";
import {typeNews} from "../types/types";
import BigCard from "./BigCard";
import styles from './../styles/ThirdBlock.module.scss'

const ThirdBlock: React.FC<typeNews> = ({items}) => {

    return (
        <div className={styles.wrap}>
            <div className={styles.big_card}>
                <BigCard {...items[2]}/>
            </div>
            <div className={styles.small_card}>
                {
                    items.slice(3,7).map((item)=>(
                        <div className={styles.newsBlockDiv} key={item?._id}>
                            <SmallCard id={item?._id} img={item?.image} title={item?.description} category={item?.category}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ThirdBlock;
