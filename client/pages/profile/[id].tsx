import styles from "./../../styles/Profile.module.scss"
import image from "../../assets/film-ukraina-trizub-sluga-naroda-vladimir-zelenskii-preziden.jpeg"
import {GetServerSideProps} from "next";
import axios from "axios";
import {News} from "../../types/types";
import React, {FC, useState} from "react";
import moment from "moment";
import 'moment/locale/uk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {getSession, signOut, useSession} from "next-auth/react";


type Details = {
    news: News[]
}
const Profile: FC<Details> = ({news}) => {
    const [change, setChange] = useState(false);
    const [name, setName] = useState(news[0].creator);
    const [location, setLocation] = useState("Kyiv, Ukraine");

    return (
        <div className={styles.wrap}>
            <div className={styles.leftSide}>
                <img src={image.src} alt=""/>
                <div className={styles.name}>
                    <h2>Volodymyr Markiv</h2>
                    <h3>MarkivV</h3>
                </div>
                <div className={styles.location}>
                    <LocationOnIcon/>
                    <h3>Kyiv, Ukraine</h3>
                </div>
                {
                    change ? (
                        <div className={styles.editData}>
                            <input onChange={(e)=>setName(e.target.value)} value={name} className={styles.titleInput} type="text" placeholder={"Імʼя"}/>
                            <input onChange={(e)=>setLocation(e.target.value)} value={location} className={styles.titleInput} type="text" placeholder={"Месцеперебування"}/>
                            <label className={styles.imageInput}>
                                <input type="file" accept={'.jpeg, .png, .jpg'}/>
                                <h2>Завантажити картинку</h2>
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

                <div className={styles.stats}>
                    <div className={styles.sts}>
                        <h3>Запропонованих статей:</h3>
                        <h2>45</h2>
                    </div>
                    <div className={styles.sts}>
                        <h3>Опублікованих статей:</h3>
                        <h2>36</h2>
                    </div>
                    <div className={styles.sts}>
                        <h3>Відхилено:</h3>
                        <h2>9</h2>
                    </div>
                </div>
                <button onClick={()=>signOut()}>Exit</button>
            </div>
            <div className={styles.rightSide}>
                {
                    news?.map((item: News)=>(
                        <div key={item._id} className={styles.card}>
                            <div className={styles.image}>
                                <div className={styles.cardImage}>
                                    <img src={item.image} alt=""/>
                                </div>
                                <div className={styles.title}>
                                    <h2>{item.title}</h2>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <div className={styles.stats}>
                                    <div className={styles.sts}>
                                        <h3>Статус:</h3>
                                        <h2>{item.published ? "Опубліковано" : "Відхилено"}</h2>
                                    </div>
                                    <div className={styles.sts}>
                                        <h3>Запропоновано:</h3>
                                        <h2> {moment(item.createdAt).format("L")}</h2>
                                    </div>
                                    <div className={styles.sts}>
                                        <h3>Дата публікації:</h3>
                                        <h2> {moment(item.updatedAt).format("L")}</h2>
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
        const res = await axios.get("http://localhost:3000/api/category/" + params.id);
        return {
            props: {
                session: session,
                news: res?.data
            },
        };
    }
};

export default Profile;
