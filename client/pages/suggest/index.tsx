import React, {useState} from 'react';
import styles from "./../../styles/Suggest.module.scss"
import styles_c from "./../../styles/CardDetails.module.scss"
import axios from "axios";
import Link from "next/link";
import moment from "moment";

function convertToBase64(file:any){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () =>{
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) =>{
            reject(error)
        }
    } )
}


const Suggest = () => {
    const list = ['Війна', 'Політика', 'Наука']
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [image, setImg] = useState("");
    const [selectedButton, setSelectedButton] = useState(0);

    const handleClick = (id: any) => {
        setSelectedButton(id)
    }

    const handleSuggest = async () =>{
        if(title && description && image){
            const res = await axios.post("http://localhost:3000/api/news", {title, description, image, category: list[selectedButton]});
            setTitle("")
            setImg("")
            setDesc("")
        }else{
            alert("Заповніть всі поля")
        }

    }

    const handleUploadImage = async (e: any) =>{
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        console.log(file)
        console.log(base64)
        // @ts-ignore
        setImg(base64)
    }



    // @ts-ignore
    return (
        <div className={styles.wrap}>
            <div className={styles.left_block}>
                <input onChange={(e)=>setTitle(e.target.value)} value={title} className={styles.titleInput} type="text" placeholder={"Заголовок статті"}/>
                <textarea onChange={(e)=>setDesc(e.target.value)} value={description} className={styles.descriptionInput}  placeholder={"Опис"}/>
                {/*<input onChange={(e)=>setImg(e.target.value)} value={image} className={styles.imageInput} type="text" placeholder={"Картинка"}/>*/}
                <label className={styles.imageInput}>
                    <input onChange={(e)=>handleUploadImage(e)}  type="file" accept={'.jpeg, .png, .jpg'}/>
                    <h2>Завантажити картинку</h2>
                </label>
                {/*<input onChange={(e)=>setCat(e.target.value)} value={category} className={styles.categoryInput} type="text" placeholder={"Категорія"}/>*/}
                <div className={styles.categories}>
                    {
                        list.map((i:string, index)=>(
                            <button key={index} className={ index === selectedButton ? styles.active : styles.disable} onClick={()=>handleClick(index)}>{i}</button>
                        ))
                    }
                </div>
                <button className={styles.button} onClick={handleSuggest}>Відправити</button>
            </div>
            <div className={styles.right_block}>
                <div className={styles_c.cardDetails_wrap}>
                    <div className={styles_c.cardDetails_leftBlock}>
                        <div className={styles_c.cardDetails_title}>
                            <h1>{title}</h1>
                                <div className={styles_c.cardDetails_CategoryBadge}>
                                    <h2>{list[selectedButton]}</h2>
                                </div>
                        </div>
                        <div className={styles_c.cardDetails_image_s}>
                            <img src={image} alt=""/>
                        </div>
                        <div className={styles_c.underImageBlock}>
                            <div className={styles_c.creator}>
                                <h2>Автор: </h2>
                                <h3>Volodymyr Markiv</h3>
                            </div>
                        </div>
                        <hr className={styles_c.hr}/>
                        <div className={styles_c.cardDetails_description}>
                    <span>
                        {description}
                    </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Suggest;
