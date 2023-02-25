import styles from "./../../styles/AdminDetails.module.scss";
import axios from "axios";
import { GetServerSideProps } from "next";
import { News } from "../../types/types";
import { FC, useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import { newsTranslate } from "../../utils/utilities";
import { listEng } from "../category/[category]";
import { toastProps } from "../login";
import { useRouter } from "next/router";
import Alerts from "../../components/Alerts";
import LayoutAdmin from "../../layouts/LayoutAdmin";
type Details = {
  news: News;
  name: string;
};

export function convertToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

const AdminDetails: FC<Details> = ({ news, name }) => {
  console.log(news);
  const [alertList, setAlertList] = useState<toastProps[]>([]);
  const [title, setTitle] = useState(news?.title);
  const [description, setDescription] = useState(news?.description);
  const [image, setImage] = useState(news?.image);
  const [category, setCategory] = useState(news?.category);
  const [tags] = useState(news?.tags);
  const [published] = useState(news?.published);
  let toastProp = null;
  const router = useRouter();

  const handleClick = (id: any) => {
    setCategory(id);
  };

  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // @ts-ignore
    setImage(base64);
  };

  const updatePost = async (e: any) => {
    e.preventDefault();
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/admin/posts/` + news._id,
      { title, description, image, category, tags, published }
    );
    if (res.status === 201) {
      toastProp = {
        id: alertList.length + 1,
        title: "Виконано",
        description: "Збереження пройшло успішно",
        bgColor: "#009216",
      };
      setAlertList([...alertList, toastProp]);
    } else {
      toastProp = {
        id: alertList.length + 1,
        title: "Помилка",
        description: "Сталась невідома помилка",
        bgColor: "#ff9900",
      };
      setAlertList([...alertList, toastProp]);
    }
  };

  const deletePost = async (e: any, id: string) => {
    e.preventDefault();
    if (id) {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/admin/posts/` + id
      );
      if (res.status === 201) {
        toastProp = {
          id: alertList.length + 1,
          title: "Виконано",
          description: "Видалення пройшло успішно",
          bgColor: "#a1fd91",
        };
        setAlertList([...alertList, toastProp]);
        await router.push("/admin");
      } else {
        toastProp = {
          id: alertList.length + 1,
          title: "Помилка",
          description: "Сталась невідома помилка",
          bgColor: "#ff9900",
        };
        setAlertList([...alertList, toastProp]);
      }
    }
  };

  const publishPost = async (e: any, id: string) => {
    e.preventDefault();
    if (id) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/admin/posts/` + id
      );
      if (res.status === 201) {
        toastProp = {
          id: alertList.length + 1,
          title: "Виконано",
          description: "Публікування пройшло успішно",
          bgColor: "#a1fd91",
        };
        setAlertList([...alertList, toastProp]);
      } else {
        toastProp = {
          id: alertList.length + 1,
          title: "Помилка",
          description: "Сталась невідома помилка",
          bgColor: "#ff9900",
        };
        setAlertList([...alertList, toastProp]);
      }
    }
  };

  return (
    <LayoutAdmin>
      <div className={styles.cardDetails_wrap}>
        <div className={styles.upperBlock}>
          <div className={styles.cardDetails_title}>
            <h1 className={styles.published}>
              Статус: {published ? " Опубліковано" : "На розгляді"}
            </h1>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={styles.cardDetails_CategoryBadge}>
              <div className={styles.categories}>
                {/*<button className={styles.active} >{newsTranslate(category)}</button>*/}
                {listEng.map((i: string, index) => (
                  <button
                    key={index}
                    className={category === i ? styles.active : styles.disable}
                    onClick={() => handleClick(i)}
                  >
                    {newsTranslate(i)}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.cardDetails_image}>
              <img src={image} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.cardDetails_leftBlock}>
          <label className={image == "" ? styles.imageInput : styles.imgActive}>
            <input
              onChange={(e) => handleUploadImage(e)}
              type="file"
              accept={".jpeg, .png, .jpg"}
            />
            {image == "" ? (
              <h4>Завантажити картинку</h4>
            ) : (
              <h4>Вибрати іншу</h4>
            )}
          </label>
          <div className={styles.underImageBlock}>
            <div className={styles.creator}>
              <h2>Автор: </h2>
              <h3>{name}</h3>
            </div>
            <div className={styles.cardDetails_dateTime}>
              <h2>Надіслано:</h2>
              <h3>{moment(news.createdAt).format("LLL")}</h3>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.cardDetails_description}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <hr className={styles.hr} />
          <div className={styles.cardDetails_tags}>
            <div className={styles.cardDetails_tagsBadge}>
              <h3>Теги:</h3>
              {tags?.map((i, index) => (
                <h2 key={index}>{i}</h2>
              ))}
            </div>
          </div>
          <div className={styles.buttons}>
            <button onClick={(e) => updatePost(e)}>
              <h2>Зберегти</h2>
            </button>
            <button onClick={(e) => deletePost(e, news._id)}>
              <h2>Видалити</h2>
            </button>
            <button onClick={(e) => publishPost(e, news._id)}>
              <h2>Опублікувати</h2>
            </button>
          </div>
        </div>
        <Alerts
          toastList={alertList}
          position={"bottom-right"}
          setAlertList={setAlertList}
        />
      </div>
    </LayoutAdmin>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/admin/posts/${params.id}`
  );
  return {
    props: {
      news: res.data.post,
      name: res.data.userName,
    },
  };
};

export default AdminDetails;
