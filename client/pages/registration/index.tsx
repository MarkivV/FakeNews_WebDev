import React, {useState} from 'react';
import styles from "../../styles/Registration.module.scss";
import axios from "axios";
import LayoutAuth from "../../layouts/LayoutAuth";
import Link from "next/link";
import {useRouter} from "next/router";
import Alerts from '../../components/Alerts';
import { toastProps } from '../login';
import imageB from "../../assets/Brazhkovich2.svg";
import Head from "next/head";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [alertList, setAlertList] = useState<toastProps[]>([]);
    let toastProp = null
    const router = useRouter()

    const handleRegister = async (e: any) =>{
        e.preventDefault()
        if(email && username && password){
            if(password === passwordConf){
                await axios.post(`${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/registration`, {email, name: username, password});
                setEmail("")
                setUsername("")
                setPassword("")
                router.push("/login")
            }else {
                toastProp = {
                    id: alertList.length+1,
                    title: "Помилка",
                    description: "Паролі не співпадають",
                    bgColor: "#fff"
                }
                setAlertList([...alertList, toastProp])
            }

        }else{
            toastProp = {
                id: alertList.length+1,
                title: "Помилка",
                description: "Заповніть всі поля",
                bgColor: "#fff"
            }
            setAlertList([...alertList, toastProp])
        }

    }

    return (
        <LayoutAuth>
            <div className={styles.wrap}>
                <Head>
                    <title>Бражкович | Реєстрація</title>
                    <meta property="og:url" content={`https://brazhkovich.vercel.app/registration`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={`Бражкович | Реєстрація`} />
                    <meta property="og:image" content={imageB} />
                </Head>
                <div className={styles.title}>
                    <h2>Реєстрація</h2>
                    <p>Зареєструйтесь для того щоб використовувати всі можливості нашого сайту</p>
                </div>
                <form className={styles.inputs}>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className={styles.titleInput} type="text" placeholder={"Введіть e-mail*"}/>
                    <input onChange={(e)=>setUsername(e.target.value)} value={username} className={styles.titleInput} type="text" placeholder={"Імʼя"}/>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className={styles.titleInput} type="password" placeholder={"Пароль"}/>
                    <input onChange={(e)=>setPasswordConf(e.target.value)} value={passwordConf} className={styles.titleInput} type="password" placeholder={"Підтвердіть пароль"}/>
                    <button className={styles.button} onClick={(e)=>handleRegister(e)}><h2>Зареєструватись</h2></button>
                </form>
                <div className={styles.desc}>
                    <p>Вже маєте акаунт?</p>
                    <Link href={"/login"}>
                        <p className={styles.ptag}>Ввійдіть</p>
                    </Link>
                </div>
                <Alerts toastList={alertList} position={"bottom-right"} setAlertList={setAlertList}/>
            </div>
        </LayoutAuth>
    );
};

export default Registration;
