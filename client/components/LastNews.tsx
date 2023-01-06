import React from 'react';
import styles from "./../styles/LastNews.module.scss"
import {typeNews} from "../types/types";
import SmallCard from "./SmallCard";



const LastNews:React.FC<typeNews> = ({items}) => {
    const item = items.slice(0,4).map((i)=>(
        <SmallCard id={i._id} img={i.image} title={i.description} category={i.category} key={i._id}/>
    ))
    return (
        <div className={styles.lastNewsBlock}>
            <h2>Останні новини</h2>
            <div className={styles.newsBlock}>
                {item}
            </div>
        </div>
    );
};

export default LastNews;
