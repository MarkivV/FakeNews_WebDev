import React, {FC} from 'react';
import {GetServerSideProps} from "next";
import axios from "axios";
import styles from "../../styles/NewsCat.module.scss"
import {News} from "../../types";
import NormalCard from "../../components/NormalCard";

type NewsCat = {
    news: News[]
}

const News: FC<NewsCat> = ({news}) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.cards}>
            {
                news.map((i: News)=>(
                        <NormalCard news={i}/>
                ))
            }
            </div>
        </div>
    );
};

export default News;
export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
    const res = await axios.get("http://localhost:3000/api/category/"+params.category);
    return {
        props: {
            news: res?.data
        },
    };
};
