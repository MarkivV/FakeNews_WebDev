import Navbar from "../components/Navbar";
import styles from "../styles/Layout.module.scss"
import {Layout} from "../types/types";
import Head from "next/head";
import Footer from "../components/Footer";
import {FC} from "react";

const MainLayouts: FC<Layout> = ({children}) => {
    return (
        <div>
            <Head>
                <title>БражковичМедіа</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"}/>
                        <link
                            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap"
                            rel="stylesheet"/>
            </Head>
            <Navbar/>
            <hr className={styles.LineOne}/>
            <div className={styles.content}>
                <div>
                    {children}
                </div>
            </div>
            <hr className={styles.Line}/>
            <Footer/>
        </div>
);
};

export default MainLayouts;