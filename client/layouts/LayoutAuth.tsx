import styles from "./../styles/LayoutAuth.module.scss"
const LayoutAuth = ({children}: any) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.bigBlock}>
                <div className={styles.leftBlock}>
                    <div className={styles.cardImg}>
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
