import React from 'react';
import styles from './../styles/Footer.module.scss'
import Link from "next/link";
const Footer = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.header_title}>
                <Link href={"/"}>
                    <h2 className={styles.title}>Бражкович</h2>
                </Link>
                <Link href={"/"}>
                    <h2 className={styles.title_small}>Медіа</h2>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
