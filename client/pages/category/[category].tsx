import {FC, useState} from 'react';
import {GetServerSideProps} from "next";
import axios from "axios";
import styles from "../../styles/NewsCat.module.scss"
import {News} from "../../types/types";
import Link from "next/link";
import img from "../../assets/400_0_1662698694-6361.jpg";
import moment from "moment";
import 'moment/locale/uk';


type NewsCat = {
    news: News[]
}
export const list = ['Війна', 'Політика', 'Наука', "Шоу-бізнес", "Україна", "Світ", "Технології", "Економіка"]
export const listEng = ['war', 'politic', 'science', "show-business", "Ukraine", "World", "Technology", "economy"]

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
                        <Link href={'/category/'+listEng[index]} key={index}>
                            <button  className={ index === selectedButton ? styles.active : styles.disable} onClick={()=>handleClick(index)}><h2>{i}</h2></button>
                        </Link>
                    ))
                }
            </div>
            <div className={styles.catTitle}>
                <h1>{list[selectedButton]}</h1>
            </div>
            <div className={styles.mainBlock}>
                {
                    news.map((i: News) => (
                        <div key={i._id} className={styles.normal_card}>
                            <div className={styles.normal_card_img}>
                                <Link href={'/news/'+i._id}>
                                    <img src={i?.image} alt=""/>
                                </Link>
                                <div className={styles.desc}>
                                    <Link href={'/news/'+i._id}>
                                        <h2>{i.title?.length > 150 ? `${i.title?.substring(0, 90)}...` : i.title}</h2>
                                        {/*<span>{i.description?.length > 150 ? `${i.description?.substring(0, 150)}...` : i.description}</span>*/}
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.normal_card_desc}>
                                    <h3>{moment(i.createdAt).format("LLL")}</h3>
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
