import {useState} from 'react';
import styles from "./../../styles/Suggest.module.scss"
import axios from "axios";
import {useSession} from "next-auth/react";
import {list, listEng} from "../category/[category]";
import {toastProps} from "../login";
import Alerts from "../../components/Alerts";

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
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [image, setImg] = useState("");
    const [selectedButton, setSelectedButton] = useState(0);
    const {data: session, status} = useSession()
    const [alertList, setAlertList] = useState<toastProps[]>([]);
    let toastProp = null

    const handleClick = (id: any) => {
        setSelectedButton(id)
    }

    const handleSuggest = async (e: any) =>{
        e.preventDefault()
        if(title && description && image){
            const res = await axios.post("http://localhost:3000/api/news", {title, description, image, category: listEng[selectedButton], creator: session?.user?.id});
            console.log(res)
            setTitle("")
            setImg("")
            setDesc("")
        }else{
            toastProp = {
                id: alertList.length+1,
                title: "Увага",
                description: "Заповніть всі поля",
                bgColor: "#FF4F00"
            }
            setAlertList([...alertList, toastProp])
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
                {
                    session ? (
                        <button className={styles.button} onClick={(e)=>handleSuggest(e)}><h2>Відправити</h2></button>
                    ):(
                        <button className={styles.button} onClick={(e)=>alert("Ви не ввійшли в свій аккаунт")}><h2>Відправити</h2></button>
                    )
                }
            </div>
            <div className={styles.right_block}>
                <h2>Маєте дотепну новину?</h2>
                <span>Пришліть її нам, будь-ласка. Якщо вона дотепна та відповідає нашим правилам, опублікуємо. Переглянути список правил можна нижче</span>
                <span>Майте на увазі що Бражкович Медіа - це тільки про старичні новини, ми не намагаємось нікого ввести в оману.</span>
                <h2>Ваша новина має більший шанс на публікацію, якщо вона відповідає наступним правилам:</h2>
                <ul>
                    <li>Не є плагіатом</li>
                    <li>Має не менш ніж 120 слів (600 знаків з пробілами)</li>
                    <li>Є дотепною та відповідає нашому формату</li>
                    <li>Написана чистою українською мовою, без помилок</li>
                    <li>Висміює якусь реальну ситуацію, але повністю вигадані новини публікуємо також</li>
                    <li>Не є прямою образою, будьте оригінальними</li>
                </ul>
            </div>
            <Alerts toastList={alertList} position={"bottom-right"} setAlertList={setAlertList}/>
        </div>
    );
};


export default Suggest;
