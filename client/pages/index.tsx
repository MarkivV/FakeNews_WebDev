import styles from '../styles/Home.module.scss'
import MainCard from "../components/MainCard";
import NormalCard from "../components/NormalCard";
import RusLosses from "../components/RusLooses";
import {News, RusStats} from "../types";
import {GetServerSideProps} from "next";
import axios from "axios";
import LastNews from "../components/LastNews";
import ThirdBlock from "../components/ThirdBlock";
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
            <div className={styles.big_info_block}>
                <ThirdBlock items={news}/>
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
            looses: data.data.stats,
            news: res.data
        },
    };
};
