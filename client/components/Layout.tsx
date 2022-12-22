import React from 'react';
import Navbar from "./Navbar";
import styles from "./../styles/Layout.module.scss"
import {Playfair_Display} from "@next/font/google";
import {Layout} from "../types";
import Head from "next/head";



const inter = Playfair_Display({ subsets: ['cyrillic'] })


const MainLayouts: React.FC<Layout> = ({children}) => {
    return (
        <div className={inter.className}>
            <Head>
                <title>БражновичМедіа</title>
            </Head>
            <Navbar/>
            <hr/>
            <div className={styles.content}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayouts;