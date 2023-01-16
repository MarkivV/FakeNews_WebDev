import styles from './../../styles/CardDetails.module.scss'
import axios from "axios";
import {GetServerSideProps } from 'next'
import {News} from "../../types/types";
import {FC} from "react";
import moment from "moment";
import 'moment/locale/uk';
import Link from "next/link";
import {newsTranslate} from "../../utils/utilities";
import SmallCard from "../../components/SmallCard";
type Details = {
    mainPost: News,
    posts: News[],
    name: string
}

const CardDetails: FC<Details> = ({mainPost, posts, name}) => {

    console.log(posts)
    // const listEng = ['war', 'politic', 'science', "show-business", "Ukraine", "World", "Technology", "economy"]


    return (
        <div className={styles.cardDetails_wrap}>
            <div className={styles.upperBlock}>
                <div className={styles.cardDetails_title}>
                    <h1>{mainPost?.title}</h1>
                    <Link href={"/category/"+ mainPost.category}>
                        <div className={styles.cardDetails_CategoryBadge}>
                            <h2>{newsTranslate(mainPost.category)}</h2>
                        </div>
                    </Link>
                </div>
                <div className={styles.cardDetails_image}>
                    <img src={mainPost?.image} alt=""/>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.cardDetails_leftBlock}>

                    <div className={styles.underImageBlock}>
                        <div className={styles.creator}>
                            <h2>Автор: </h2>
                            <h3>{name}</h3>
                        </div>
                        <div className={styles.cardDetails_dateTime}>
                            <h3>{moment(mainPost.createdAt).format("LLL")}</h3>
                        </div>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.cardDetails_description}>
                    <span>
                        {mainPost?.description}
                    </span>
                    </div>

                    <div className={styles.cardDetails_otherInfo}>
                        <h3>Читайте нас у: </h3>
                        <h2><a href="https://t.me/brazhkovich">Telegram</a></h2>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.cardDetails_tags}>
                        <div className={styles.cardDetails_tagsBadge}>
                            <h3>Теги:</h3>
                            {mainPost.tags.map((i,index)=>(
                                <h2 key={index}>{i}</h2>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.right_block}>
                    <div className={styles.title_rb}>
                        <h2>Інше від цього автора</h2>
                    </div>
                    <div className={styles.cards}>
                        {
                            posts.slice(0,5).map((post)=>(
                                <div className={styles.card} key={post?._id}>
                                    <SmallCard category={post?.category} id={post?._id} img={post?.image} title={post?.title}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
    const res = await axios.get(
        `http://localhost:3000/api/news/${params.id}`
    );
    return {
        props: {
            mainPost: res.data.post,
            posts: res.data.posts,
            name: res.data.userName
        },
    };
};

export default CardDetails;
