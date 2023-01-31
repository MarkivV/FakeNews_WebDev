import styles from "./../../styles/Profile.module.scss"
import image from "../../assets/film-ukraina-trizub-sluga-naroda-vladimir-zelenskii-preziden.jpeg"
import {GetServerSideProps} from "next";
import axios from "axios";
import {News, User} from "../../types/types";
import React, {FC, useState} from "react";
import moment from "moment";
import 'moment/locale/uk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {getSession, signOut, useSession} from "next-auth/react";
import { Session } from "next-auth/core/types";


type Details = {
    news: News[],
    user: User
}
const Profile: FC<Details> = ({news, user}) => {
    const [change, setChange] = useState(false);
    const [name, setName] = useState(news[0]?.creator);

    return (
        <div className={styles.wrap}>
            <div className={styles.leftSide}>
                <img src={user?.image} alt=""/>
                <div className={styles.name}>
                    <h2>{user?.name}</h2>
                    <h3>{user?.email}</h3>
                </div>
                {
                    change ? (
                        <div className={styles.editData}>
                            <input onChange={(e)=>setName(e.target.value)} value={name} className={styles.titleInput} type="text" placeholder={"Імʼя"}/>
                            <label className={styles.imageInput}>
                                <input type="file" accept={'.jpeg, .png, .jpg'}/>
                                <h4>Завантажити картинку</h4>
                            </label>
                            <div className={styles.buttons}>
                                <button className={styles.button} onClick={()=>setChange(false)}>Зберегти</button>
                                <button className={styles.button} onClick={()=>setChange(false)}>Відмінити</button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.button}>
                            <button onClick={()=>setChange(!change)}>Змінити профіль</button>
                        </div>
                    )
                }

                <button onClick={()=>signOut()}>Вийти</button>
            </div>
            <div className={styles.rightSide}>
                {
                    news?.map((item: News)=>(
                        <div key={item?._id} className={styles.card}>
                            <div className={styles.image}>
                                <div className={styles.cardImage}>
                                    <img src={item?.image} alt=""/>
                                </div>
                                <div className={styles.title}>
                                    <h2>{item?.title}</h2>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <div className={styles.stats}>
                                    <div className={styles.sts}>
                                        <h3>Статус:</h3>
                                        <h2>{item?.published ? "Опубліковано" : "Відхилено"}</h2>
                                    </div>
                                    <div className={styles.sts}>
                                        <h3>Запропоновано:</h3>
                                        <h2> {moment(item?.createdAt).format("L")}</h2>
                                    </div>
                                    <div className={styles.sts}>
                                        <h3>Дата публікації:</h3>
                                        <h2> {moment(item?.updatedAt).format("L")}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params, req}: any) => {
    const session = await getSession({req})
    if(!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }else {
        const user = await axios.get("http://localhost:3000/api/profile/" + session.user.id);
        const res = await axios.get("http://localhost:3000/api/news/newsprof/" + session.user.id);
        return {
            props: {
                user: user?.data,
                news: res?.data
            },
        };
    }
};

export default Profile;
