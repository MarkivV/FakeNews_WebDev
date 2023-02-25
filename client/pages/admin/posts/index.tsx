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


  const PublishAll = async (e:any, publish: Boolean) =>{
    e.preventDefault()
    const res = await axios.put(
      "http://localhost:3000/api/admin/posts", {
        published: publish
      }
    );
    if (res.status === 201) {
      toastProp = {
        id: alertList.length + 1,
        title: "Виконано",
        description: "Зміни пройшли успішно",
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
  const publishPost = async (e: any, id: string, published: boolean, rating: Number) => {
    e.preventDefault();
    if (id) {
      const res = await axios.post(
        "http://localhost:3000/api/admin/posts/" + id,
        { 
          published,
          rating: e.target.value || rating
         }
      );

      const find = postList.findIndex((post) => post._id === id);
      const updateObj = { ...postList[find], published: published };
      setPostList([
        ...postList.slice(0, find),
        updateObj,
        ...postList.slice(find + 1),
      ]);
      if (res.status === 201) {
        toastProp = {
          id: alertList.length + 1,
          title: "Виконано",
          description: "Зміни пройшли успішно",
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
        <div className={styles.publishButton}>
          <button onClick={(e)=>PublishAll(e, false)}>Архівувати все</button>
          <button onClick={(e)=>PublishAll(e, true)}>Опублікувати все</button>
        </div>
        <div className={styles.mainBlock}>
          {postList.map((post) => (
            <div className={styles.card} key={post?._id}>
              <div className={styles.upperBlock}>
                <div className={styles.image}>
                  <img src={post?.image} alt="" />
                </div>
              </div>
              <div className={styles.title}>
                <h3>{post?.title}</h3>
                <h2>
                  {post?.description.length > 300
                    ? `${post?.description.substring(0, 300)}...`
                    : post?.description}
                </h2>
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
                  onClick={(e) => publishPost(e, post?._id, !post?.published, post?.rating)}
                >
                  <h3>{post?.published ? "Архівувати" : "Опублікувати"}</h3>
                </button>
                <select
                  name="Admin"
                  id="Admin"
                  onChange={(e) => publishPost(e, post?._id, post?.published)}
                >
                  <option value="0" selected={post?.rating === 0}>
                    0
                  </option>
                  <option value="1" selected={post?.rating === 1}>
                    1
                  </option>
                  <option value="2" selected={post?.rating === 2}>
                    2
                  </option>
                  <option value="3" selected={post?.rating === 3}>
                    3
                  </option>
                  <option value="4" selected={post?.rating === 4}>
                    4
                  </option>
                  <option value="5" selected={post?.rating === 5}>
                    5
                  </option>
                  <option value="6" selected={post?.rating === 6}>
                    6
                  </option>
                  <option value="7" selected={post?.rating === 7}>
                    7
                  </option>
                  <option value="8" selected={post?.rating === 8}>
                    8
                  </option>
                  <option value="9" selected={post?.rating === 9}>
                    9
                  </option>
                </select>
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
