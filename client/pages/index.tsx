import styles from '../styles/Home.module.scss'
import MainCard from "../components/MainCard";
import NormalCard from "../components/NormalCard";
import RusLosses from "../components/RusLooses";
import {News, RusStats} from "../types";
import {GetStaticProps} from "next";
import axios from "axios";
import LastNews from "../components/LastNews";
import ThirdBlock from "../components/ThirdBlock";


type Props = {
    // looses: RusStats,
    news: News[]
}

export default function Home({news }: Props) {

  return (
    <div className={styles.wrap}>
        {/*<RusLosses looses={looses}/>*/}
        <div className={styles.upper_block}>
          <MainCard news={news[0]}/>
          <NormalCard news={news[1]}/>
        </div>
        <div className={styles.middle_block}>
          <div className={styles.lastNews}>
              <LastNews items={news} />
          </div>
        </div>
        <div className="third-block">
            <div className={"big-info-block"}>
                <ThirdBlock items={news}/>
            </div>
        </div>
        {/*  <h1>Бражкович медіа</h1>*/}
    </div>
  )

}


export const getServerSideProps = async () => {
    const res = await axios.get("http://localhost:3000/api/news");
    return {
        props: {
            news: res.data
        },
    };
};
