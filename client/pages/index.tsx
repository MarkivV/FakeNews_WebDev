import styles from '../styles/Home.module.scss'
import MainCard from "../components/MainCard";
import NormalCard from "../components/NormalCard";
import RusLosses from "../components/RusLooses";
import {News, RusStats} from "../types";
import {GetServerSideProps} from "next";
import axios from "axios";
import LastNews from "../components/LastNews";
import ThirdBlock from "../components/ThirdBlock";
import Link from "next/link";
import img from "../assets/400_0_1662698694-6361.jpg";
import React from "react";
type Props = {
    news: News[],
    looses: RusStats
}

export default function Home({looses, news }: Props) {
    return (
    <div className={styles.wrap}>
        <RusLosses looses={looses}/>
        <div className={styles.upper_block}>
          <MainCard news={news[0]}/>
          <NormalCard news={news[1]}/>
        </div>
        <div className={styles.middle_block}>
          <div className={styles.lastNews}>
              <LastNews items={news} />
          </div>
        </div>
        <div className={styles.third_block}>
                <ThirdBlock items={news}/>
        </div>

        <div className={styles.newsBlock}>
            <div className={styles.fist_part}>
                <Link href={"/category/Війна"}>
                    <h2>Війна</h2>
                </Link>
            </div>
            <div className={styles.second_part}>
            {
                news.filter(cat => cat.category === "Війна").slice(0,10).map((i)=>(
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
        <div className={styles.newsBlock}>
            <div className={styles.fist_part}>
                <Link href={"/category/Політика"}>
                    <h2>Політика</h2>
                </Link>
            </div>
            <div className={styles.second_part}>
                {
                    news.filter(cat => cat.category === "Політика").slice(0,10).map((i)=>(
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
    </div>
  )

}


export const getServerSideProps: GetServerSideProps = async () => {
    const res = await axios.get("http://localhost:3000/api/news");
    const lost = await axios.get("https://russianwarship.rip/api/v1/statistics/latest")
    const {data} = lost
    return {
        props: {
            looses: data?.data?.stats,
            news: res?.data
        },
    };
};
