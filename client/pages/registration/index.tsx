import React, {useState} from 'react';
import styles from "../../styles/Registration.module.scss";
import axios from "axios";
import LayoutAuth from "../../layouts/LayoutAuth";
import Image from "next/image";
import google from "../../public/asset/google.svg";
import git from "../../public/asset/github.svg";
import Link from "next/link";
import {useRouter} from "next/router";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const router = useRouter()

    const handleRegister = async (e: any) =>{
        e.preventDefault()
        if(email && username && password){
            if(password === passwordConf){
                await axios.post("http://localhost:3000/api/registration", {email, username, password});
                setEmail("")
                setUsername("")
                setPassword("")
                router.push("/login")
            }else {
                alert("Паролі не співпадають")
            }

        }else{
            alert("Заповніть всі поля")
        }

    }

    return (
        <LayoutAuth>
            <div className={styles.wrap}>
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
            </div>
        </LayoutAuth>
    );
};

export default Registration;
