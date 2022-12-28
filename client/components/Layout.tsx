import React from 'react';
import Navbar from "./Navbar";
import styles from "./../styles/Layout.module.scss"
import {Roboto} from "@next/font/google";
import {Layout} from "../types";
import Head from "next/head";
import Footer from "./Footer";



const inter = Roboto({
    subsets: ['cyrillic'],
    weight: ["300", "400", "500"]
})


const MainLayouts: React.FC<Layout> = ({children}) => {
    return (
        <div className={inter.className}>
            <Head>
                <title>БражковичМедіа</title>
            </Head>
            <Navbar/>
            <hr className={styles.Line}/>
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