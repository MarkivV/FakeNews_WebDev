import React, {FC, useState} from 'react';
import {GetServerSideProps} from "next";
import axios from "axios";
import styles from "../../styles/NewsCat.module.scss"
import {News} from "../../types";
import NormalCard from "../../components/NormalCard";
import Link from "next/link";
import img from "../../assets/400_0_1662698694-6361.jpg";

type NewsCat = {
    news: News[]
}
const list = ['Війна', 'Політика', 'Наука']

const News: FC<NewsCat> = ({news}) => {
    const [selectedButton, setSelectedButton] = useState(0);

    const handleClick = (id: any) => {
        setSelectedButton(id)
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.categories}>
                {
                    list.map((i:string, index)=>(
                        <Link href={'/category/'+i} key={index}>
                            <button  className={ index === selectedButton ? styles.active : styles.disable} onClick={()=>handleClick(index)}>{i}</button>
                        </Link>
                    ))
                }
            </div>
            <div className={styles.mainBlock}>
                {
                    news.map((i: News) => (
                        <div className={styles.normal_card}>
                            <div className={styles.normal_card_img}>
                                <Link href={'/news/'+i._id}>
                                    <img src={i?.image} alt=""/>
                                </Link>
                            </div>
                            <div className={styles.normal_card_desc}>
                                <Link href={'/news/'+i._id}>
                                    <h2>{i.title}</h2>
                                    <span>{i.description?.length > 150 ? `${i.description?.substring(0, 150)}...` : i.description}</span>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default News;
export const getServerSideProps: GetServerSideProps = async ({params}: any) => {
    const res = await axios.get("http://localhost:3000/api/category/" + params.category);
    return {
        props: {
            news: res?.data
        },
    };
};
