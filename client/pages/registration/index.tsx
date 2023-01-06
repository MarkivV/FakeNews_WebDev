import React, {useState} from 'react';
import styles from "../../styles/Login.module.scss";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () =>{
        if(email && login && username && password){
            const res = await axios.post("http://localhost:3000/api/registration", {email, login, username, password});
            setEmail("")
            setLogin("")
            setUsername("")
            setPassword("")
        }else{
            alert("Заповніть всі поля")
        }

    }

    return (
        <div className={styles.wrap}>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className={styles.titleInput} type="text" placeholder={"Введіть e-mail"}/>
            <input onChange={(e)=>setLogin(e.target.value)} value={login} className={styles.titleInput} type="text" placeholder={"Введіть логін"}/>
            <input onChange={(e)=>setUsername(e.target.value)} value={username} className={styles.titleInput} type="text" placeholder={"Введіть імʼя яке буде відображатись на сайті"}/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className={styles.titleInput} type="password" placeholder={"Пароль"}/>
            <button className={styles.button} onClick={handleLogin}>Ввійти</button>
        </div>
    );
};

export default Login;
