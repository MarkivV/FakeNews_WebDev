import styles from "./../styles/LayoutAuth.module.scss"
import Link from "next/link";
import React from "react";
const LayoutAuth = ({children}: any) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.bigBlock}>
                <div className={styles.leftBlock}>
                    <div className={styles.cardImg}>
                        {/*<h2 className={styles.title}>Бражкович</h2>*/}
                        {/*<h2 className={styles.title_small}>Медіа</h2>*/}
                    </div>
                </div>
                <div className={styles.rightBlock}>
                    <div className={styles.children}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutAuth;
