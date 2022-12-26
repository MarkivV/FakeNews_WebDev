import React, {useState} from 'react';
import styles from './../styles/Footer.module.scss'
import Link from "next/link";

const Footer = () => {
    const [email, setEmail] = useState("");

    const sendEmail = () => {

    }

    return (
        <div className={styles.wrap}>
            <div className={styles.left_block}>
                <div className={styles.header_title}>
                    <Link href={"/"}>
                        <h2 className={styles.title}>Бражкович</h2>
                    </Link>
                    <Link href={"/"}>
                        <h2 className={styles.title_small}>Медіа</h2>
                    </Link>
                </div>
                <div className={styles.otherInfo}>
                    <span>
                        Всі права на матеріали, опубліковані на даному ресурсі, належать ТОВ "ФОКУС МЕДІА". Будь-яке використання матеріалів без письмового дозволу ТОВ "ФОКУС МЕДІА" — заборонено. При використанні матеріалів з даного ресурсу гіперпосилання focus.ua обовʼязкове.
                        Даний ресурс — для користувачів віком від 18 років і старше.
                        FOCUS.UA — більше ніж просто новини.
                    </span>
                </div>

            </div>
            <div className={styles.right_block}>
                <div className={styles.categories}>
                    <h1>Новини</h1>
                    <h1>Головна</h1>
                    <h1>Останні</h1>
                    <h1>Запропонувати</h1>
                    <h1>Профіль</h1>
                    <h1>Вийти</h1>
                    <h1>Важливо</h1>
                </div>
                <div className={styles.socials}>
                    <h1>Instagram</h1>
                    <h1>Telegram</h1>
                </div>
            </div>
        </div>
    );
};

export default Footer;
