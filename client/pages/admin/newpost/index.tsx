import { useSession } from "next-auth/react";
import { useState } from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import { toastProps } from "../../login";
import styles from "./../../../styles/AdminNewPost.module.scss"
import { convertToBase64 } from "../../suggest";
import { list, listEng } from "../../category/[category]";
import axios from "axios";

const NewPost = () => {

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImg] = useState("");
  const [selectedButton, setSelectedButton] = useState(0);
  const {data: session} = useSession()
  const [alertList, setAlertList] = useState<toastProps[]>([]);
  const [checked, setChecked] = useState(false)
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
      // @ts-ignore
      setImg(base64)
  }

  return (
    <LayoutAdmin>
      <div className={styles.wrap}>
        <div className={styles.left_block}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={styles.titleInput}
            type="text"
            placeholder={"Заголовок статті"}
          />
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={description}
            className={styles.descriptionInput}
            placeholder={"Опис"}
          />
          {/*<input onChange={(e)=>setImg(e.target.value)} value={image} className={styles.imageInput} type="text" placeholder={"Картинка"}/>*/}
          <label className={styles.imageInput}>
            <input
              onChange={(e) => handleUploadImage(e)}
              type="file"
              accept={".jpeg, .png, .jpg"}
            />
            <h4>Завантажити картинку</h4>
          </label>
          {/*<input onChange={(e)=>setCat(e.target.value)} value={category} className={styles.categoryInput} type="text" placeholder={"Категорія"}/>*/}
          <div className={styles.categories}>
            {list.map((i: string, index) => (
              <button
                key={index}
                className={
                  index === selectedButton ? styles.active : styles.disable
                }
                onClick={() => handleClick(index)}
              >
                {i}
              </button>
            ))}
          </div>
          {session ? (
            <button className={styles.button} onClick={(e) => handleSuggest(e)}>
              <h2>Відправити</h2>
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => alert("Ви не ввійшли в свій аккаунт")}
            >
              <h2>Відправити</h2>
            </button>
          )}
          <div className={styles.check}>
            <input checked={checked} type="checkbox" onClick={()=>setChecked(!checked)}/>
            <span className={styles.checkmark}></span>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default NewPost;
