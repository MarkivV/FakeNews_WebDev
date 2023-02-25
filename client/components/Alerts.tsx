import {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {toastProps} from "../pages/login";
import styles from "./../styles/Alerts.module.scss"
import CloseIcon from '@mui/icons-material/Close';

type toastLists ={
    toastList: toastProps[],
    position: string,
    setAlertList: Dispatch<SetStateAction<toastProps[]>>
}

const Alert: FC<toastLists> = ({toastList, position,setAlertList}) => {

    const deleteToast = useCallback((id: number) =>{
        const toastListItem = toastList.filter(e=> e.id !== id)
        setAlertList(toastListItem)
    }, [toastList])
    return (
        <div className={`${styles.wrap} ${styles[position]}`}>
            {
                toastList?.map((i, index)=>(
                    <div
                        className={`${styles.notify} ${styles.toast_to_right} ${styles[position]}`}
                        key={index}
                        style={{backgroundColor: "#fff"}}
                    >
                        <button onClick={()=>deleteToast(i.id)}><CloseIcon/></button>
                        <div className={styles.block}>
                            <h2 className={styles.title}>{i?.title}</h2>
                            <p className={styles.desc}>{i?.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Alert;
