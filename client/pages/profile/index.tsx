import styles from "./../../styles/Profile.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";
import { News, User } from "../../types/types";
import React, { FC, useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import { getSession, signOut, useSession } from "next-auth/react";

type Details = {
  news: News[];
  user: User;
};
const Profile: FC<Details> = ({ news, user }) => {
  const [change, setChange] = useState(false);
  const [name, setName] = useState(news[0]?.creator);
  const [postsList, setPostsList] = useState(news);
  const [page, setPage] = useState(1);
  const { data: session } = useSession();

  return (
    <div className={styles.wrap}>
      <div className={styles.leftSide}>
        <div className={styles.name}>
          <h2>{user?.name}</h2>
          <h3>{user?.email}</h3>
        </div>
        <button onClick={() => signOut()}>Вийти</button>
      </div>
      <div className={styles.rightSide}>
        {postsList?.map((item: News) => (
          <div key={item?._id} className={styles.card}>
            <div className={styles.image}>
              <div className={styles.cardImage}>
                <img src={item?.image} alt="" />
              </div>
              <div className={styles.title}>
                <h2>{item?.title}</h2>
                <h3>
                  {item?.description.length > 300
                    ? `${item?.description.substring(0, 300)}...`
                    : item?.description}
                </h3>
              </div>
            </div>
            <div className={styles.description}>
              <div className={styles.stats}>
                <div className={styles.sts}>
                  <h3>Статус:</h3>
                  <h2>{item?.published ? "Опубліковано" : "На розгляді"}</h2>
                </div>
                <div className={styles.sts}>
                  <h3>Запропоновано:</h3>
                  <h2> {moment(item?.createdAt).format("L")}</h2>
                </div>
                <div className={styles.sts}>
                  <h3>Дата публікації:</h3>
                  <h2>
                    {item?.published
                      ? moment(item?.updatedAt).format("L")
                      : "-"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.loadMoreButton}>
          <button
            onClick={async () => {
              setPage(page + 1);
              console.log(page);
              
              const getNextPosts = await axios.get(
                "http://localhost:3000/api/news/newsprof/" + session?.user.id,
                {
                  params: {
                    page: page,
                  },
                }
              );

              setPostsList([...postsList, ...getNextPosts.data])
            }}
          >
            Завантажити ще
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}: any) => {
  const session = await getSession({ req });
  // console.log(params);
  console.log(req.params?.page);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const user = await axios.get(
      "http://localhost:3000/api/profile/" + session.user.id
    );
    const res = await axios.get(
      "http://localhost:3000/api/news/newsprof/" + session.user.id,
      {
        params: {
          page: 0,
        },
      }
    );
    return {
      props: {
        user: user?.data,
        news: res?.data,
      },
    };
  }
};
export default Profile;