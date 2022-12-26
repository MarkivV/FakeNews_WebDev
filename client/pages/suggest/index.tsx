import React, {useState} from 'react';
import styles from "./../../styles/Suggest.module.scss"
import axios from "axios";
const Suggest = () => {
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [image, setImg] = useState("");
    const [category, setCat] = useState("");

    const handleSuggest = async () =>{
        const res = await axios.post("http://localhost:3000/api/news", {title, description, image, category});
        // @ts-ignore
        if(res.status === "201"){
            alert("hi")
        }
    }
    return (
        <div className={styles.wrap}>
            <div className={styles.left_block}>
                <input onChange={(e)=>setTitle(e.target.value)} className={styles.titleInput} type="text" placeholder={"Заголовок статті"}/>
                <input onChange={(e)=>setDesc(e.target.value)} className={styles.descriptionInput} type="text" placeholder={"Опис"}/>
                <input onChange={(e)=>setImg(e.target.value)} className={styles.imageInput} type="text" placeholder={"Картинка"}/>
                <input onChange={(e)=>setCat(e.target.value)} className={styles.categoryInput} type="text" placeholder={"Категорія"}/>
                <button className={styles.button} onClick={handleSuggest}>Відправити</button>
            </div>
            <div className={styles.right_block}>

            </div>

        </div>
    );
};

export default Suggest;
