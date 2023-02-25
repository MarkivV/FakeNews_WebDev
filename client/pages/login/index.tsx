import {useState} from 'react';
import styles from "../../styles/Login.module.scss";
import LayoutAuth from "../../layouts/LayoutAuth";
import Link from "next/link";
import Image from "next/image";
import google from "./../../public/asset/google.svg"
import git from "./../../public/asset/github.svg"
import {signIn} from "next-auth/react"
import {useRouter} from "next/router";
import Alerts from "../../components/Alerts";

export type toastProps = {
    id: number,
    title: string,
    description: string,
    bgColor: string
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertList, setAlertList] = useState<toastProps[]>([]);
    const router = useRouter()
    let toastProp = null

    async function handleLogin(e: any) {
        e.preventDefault()
        if (email && password) {
            const status = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: "/"
            })
            console.log(status)
            setEmail("")
            setPassword("")
            console.log(status)
            if (status?.ok) {
                // @ts-ignore
                router.push(status?.url)
            }else if(status?.error){
                toastProp = {
                    id: alertList.length+1,
                    title: "Помилка",
                    description: "Email або пароль введені не правильно",
                    bgColor: "#fff"
                }
                setAlertList([...alertList, toastProp])
            }
        } else {
            alert("Заповніть всі поля")
            toastProp = {
                id: alertList.length+1,
                title: "Увага",
                description: "Заповніть всі поля",
                bgColor: "#fff"
            }
            setAlertList([...alertList, toastProp])
        }

    }

    // Google Handler function
    async function handleGoogleSignin(e: any){
        e.preventDefault()
        await signIn('google', { callbackUrl : `${process.env.NEXTAUTH_URL}`})
    }

    // Github Login
    async function handleGithubSignin(e: any){
        e.preventDefault()
        await signIn('github', { callbackUrl : `${process.env.NEXTAUTH_URL}`})
    }

    return (
        <LayoutAuth>
            <div className={styles.wrap}>
                <div className={styles.title}>
                    <h2>Авторизція</h2>
                    <p>Ввійдіть для того щоб використовувати всі можливості нашого сайту</p>
                </div>
                <form className={styles.inputs}>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className={styles.titleInput}
                           type="text" placeholder={"Введіть e-mail"}/>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className={styles.titleInput}
                           type="password" placeholder={"Пароль"}/>
                    <button className={styles.button} onClick={(e)=>handleLogin(e)}><h2>Ввійти</h2></button>
                    <button className={styles.buttonGoogle} onClick={(e)=>handleGoogleSignin(e)}><h2>Ввійти за допомогою
                        Google</h2><Image src={google} alt={"google"} width={20} height={20}/></button>
                    <button className={styles.buttonGit} onClick={(e)=>handleGithubSignin(e)}><h2>Ввійти за допомогою
                        GitHub </h2><Image src={git} alt={"git"} width={20} height={20}/></button>
                </form>
                <div className={styles.desc}>
                    <p>Ще не маєте акаунту?</p>
                    <Link href={"/registration"}>
                        <p className={styles.ptag}>Зареєструйтесь</p>
                    </Link>
                </div>
            </div>
            <Alerts toastList={alertList} position={"bottom-right"} setAlertList={setAlertList}/>
        </LayoutAuth>
    );
};

export default Login;