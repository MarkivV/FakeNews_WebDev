import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import styles from './../styles/Navbar.module.scss'
import Link from "next/link";

const Header = () => {
    // const token = Cookies.get('jwt');


    return (
        <div className={styles.header}>
            <div className={styles.header_title}>
                <Link href={"/"}>
                    <h2 className={styles.title}>Бражкович</h2>
                </Link>
                <Link href={"/"}>
                    <h2 className={styles.title_small}>Медіа</h2>
                </Link>
            </div>
            <div className={styles.menu}>
                <Link href={"/"}>
                    <h2>Головна</h2>
                </Link>
                <Link href={"/category/Війна"}>
                    <h2>Новини</h2>
                </Link>
                <Link href={"/suggest"}>
                    <h2>Бєсєдка</h2>
                </Link>
                <h2>Блог</h2>
            </div>
            <div className={styles.header_icons}>
                <SearchIcon/>

                <Link href={"/profile/Війна"}>
                    <PersonIcon/>
                </Link>
            </div>
        </div>
    );
};

export default Header;
