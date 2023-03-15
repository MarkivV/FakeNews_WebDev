import React, { useState } from "react";
import styles from "./../../styles/Suggest.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";
import { list, listEng } from "../category/[category]";
import { toastProps } from "../login";
import Alerts from "../../components/Alerts";
import Link from "next/link";
import Head from "next/head";
import {generateSlug} from "../../utils/utilities";
import imageB from "../../assets/Brazhkovich.svg";
const Suggest = () => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [selectedButton, setSelectedButton] = useState(0);
  const { data: session } = useSession();
  const [alertList, setAlertList] = useState<toastProps[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const handleImageChange = (event: any) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };
  let toastProp = null;
  const handleClick = (id: any) => {
    setSelectedButton(id);
  };
  const handleSuggest = async (e: any) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("name", image.name);

      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };


      try {
        setDisabledButton(true)
        console.log(formData)
          const imageUrl = await axios.post(`${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/upload`, formData, config)
        if(imageUrl.status === 201){
          if (title && description) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/news`, {
              title,
              description,
              image: imageUrl.data,
              category: listEng[selectedButton],
              creator: session?.user?.id,
              url: generateSlug(title)
            });
            if(res.status === 201){
              console.log(res);
              setTitle("");
              setImage(null);
              setDesc("");
              setDisabledButton(false)
            }else if (res.status === 203){
                toastProp = {
                  id: alertList.length + 1,
                  title: "Увага",
                  description: "Ви не підтвердили свою пошту",
                  bgColor: "#FF4F00",
                };
                setAlertList([...alertList, toastProp]);
                setDisabledButton(false)
            } else {
                toastProp = {
                  id: alertList.length + 1,
                  title: "Увага",
                  description: "Заповніть всі поля",
                  bgColor: "#FF4F00",
                };
                setAlertList([...alertList, toastProp]);
                setDisabledButton(false)
            }
          }
        }else{
          console.log("GOKOG")
        }



      } catch (error) {
        console.error(error);
      }


    }
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <div className={styles.wrap}>
      <Head>
        <title>Бражкович | Запропонувати</title>
        <meta property="og:url" content={`https://brazhkovich.com/suggest`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Бражкович | Запропонувати новину`} />
        <meta property="og:image" content={imageB} />
        <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6465383896599402"
                crossOrigin="anonymous"></script>
      </Head>
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
        <label className={styles.imageInput}>
          <input
            onChange={handleImageChange}
            type="file"
            accept={".jpeg, .png, .jpg"}

          />
          {image === null ? <h4>Завантажити картинку</h4> : <h4>Вибрати іншу</h4>}
        </label>
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
          <button className={session && !disabledButton ? styles.button : styles.buttonDis} disabled={!session && disabledButton} onClick={(e) => handleSuggest(e)}>
            <h3>Відправити</h3>
          </button>

      </div>
      <div className={styles.right_block}>
        <span>
          <strong>
            Перед тим як пропонувати свою новину зареєструйтесь та підтвердіть свою пошту
          </strong>
        </span>
        <span>
          Якщо Ви хочете опублікувати свою сатиричну новину, то перед тим, як це
          зробити, давайте поговоримо про наші правила. Ми хочемо зберегти
          якість нашого контенту та забезпечити безпеку наших користувачів, тому
          є кілька критеріїв, які ми встановлюємо для публікацій.
        </span>
        <span>
          Спочатку, ваша новина має бути не менше <strong>200</strong> слів. Це дозволяє нам
          забезпечити достатню кількість матеріалу для створення сатиричного
          настрою та забезпечення різноманітності публікацій.
        </span>
        <span>
          Друге, переконайтеся, що ваша новина не містить елементів плагіату. Ми
          дуже серйозно ставимося до авторських прав, тому будь-які матеріали,
          що містять велику кількість скопійованого вмісту, не будуть прийняті,
          будь-яка публікація, яку ви надсилаєте на сайт <strong>Бражкович</strong>, має бути
          вашої власної творчої роботи. Не надсилайте матеріали, що вже були
          опубліковані на інших сайтах, якщо вони не є вашою власною роботою.
        </span>
        <span>
          Третє, наш сайт призначений для публікації сатиричних новин, а не
          злості, переконайтеся, що ваша новина не містить матеріалів, що можуть
          образити конкретних людей або мають дискримінаторний вміст.
        </span>
        <span>
          Ми рекомендуємо вам перевірити вашу публікацію на граматичні та
          орфографічні помилки перед публікацією. Ми зацікавлені в якісних та
          професійних публікаціях, тому будь-ласка переконайтеся, що ваш текст є
          читабельним та зрозумілим.
        </span>
        <span>
          Ми дуже цінуємо наші правила та сподіваємося, що ви зробите все
          можливе, щоб дотримуватися їх під час написання своєї сатиричної
          новини.
        </span>
        <span>
          <strong>
            Ми залишаємо за собою право змінити або відхилити будь-яку публікацію, яка не
            відповідає нашим правилам без пояснення причин. Якщо у вас є будь-які запитання, не
            соромтеся звернутися до нас.
          </strong>
        </span>
        <div className={styles.email}>
            <h3>Зворотній зв`язок:</h3>
            <Link href={"mailto:info@brazhkovich.com"}>
              <h2>info@brazhkovich.com</h2>
            </Link>
          </div>
      </div>
      <Alerts
        toastList={alertList}
        position={"bottom-right"}
        setAlertList={setAlertList}
      />
    </div>
  );
};

export default Suggest;
