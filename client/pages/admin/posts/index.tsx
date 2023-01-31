import { FC, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { News } from "../../../types/types";
import styles from "./../../../styles/Admin.module.scss";
import { toastProps } from "../../login";
import Alerts from "../../../components/Alerts";
import Link from "next/link";
import LayoutAdmin from "../../../layouts/LayoutAdmin";

type AdminDashboard = {
  posts: News[];
};

const Admin: FC<AdminDashboard> = ({ posts }) => {
  const [postList, setPostList] = useState(posts);
  const [alertList, setAlertList] = useState<toastProps[]>([]);
  let toastProp = null;

  const deletePost = async (e: any, id: string) => {
    e.preventDefault();
    if (id) {
      const res = await axios.delete(
        "http://localhost:3000/api/admin/posts/" + id
      );
      if (res.status === 201) {
        toastProp = {
          id: alertList.length + 1,
          title: "Виконано",
          description: "Видалення пройшло успішно",
          bgColor: "#009216",
        };
        setAlertList([...alertList, toastProp]);
        setPostList(postList.filter((post) => post._id !== id));
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

  const publishPost = async (e: any, id: string, published: boolean) => {
    e.preventDefault();
    if (id) {
      const res = await axios.post(
        "http://localhost:3000/api/admin/posts/" + id,
        { published }
      );
      if (res.status === 201) {
        toastProp = {
          id: alertList.length + 1,
          title: "Виконано",
          description: "Публікування пройшло успішно",
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
    }
  };

  return (
    <LayoutAdmin>
      <div className={styles.wrap}>
        <div className={styles.mainBlock}>
          {postList.map((post) => (
            <div className={styles.card} key={post?._id}>
              <div className={styles.upperBlock}>
                <div className={styles.image}>
                  <img src={post?.image} alt="" />
                </div>
                <div className={styles.title}>
                  <h3>{post?.title}</h3>
                </div>
              </div>
              <div className={styles.buttons}>
                <Link href={"/admin/" + post?._id}>
                  <button>
                    <h3>Редагувати</h3>
                  </button>
                </Link>
                <button onClick={(e) => deletePost(e, post?._id)}>
                  <h3>Видалити</h3>
                </button>
                <button
                  onClick={(e) => publishPost(e, post?._id, post?.published)}
                >
                  <h3>{post?.published ? "Архівувати" : "Опублікувати"}</h3>
                </button>
              </div>
            </div>
          ))}
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

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/posts/");
    return {
      props: {
        posts: res?.data,
      },
    };
  // }
};

export default Admin;
