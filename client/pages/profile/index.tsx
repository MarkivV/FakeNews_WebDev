import styles from "./../../styles/Profile.module.scss";
import { GetServerSideProps } from "next";
import axios from "axios";
import { News, User } from "../../types/types";
import React, { FC, useState } from "react";
import moment from "moment";
import "moment/locale/uk";

import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image"
import imageB from "../../assets/Brazhkovich.svg";
import Head from "next/head";

type Details = {
  news: News[];
  user: User;
};
const Profile: FC<Details> = ({ news, user }) => {
  const [postsList, setPostsList] = useState(news);
  const [page, setPage] = useState(1);
  const { data: session } = useSession();
  return (
    <div className={styles.wrap}>
      <Head>
        <title>Бражкович | Профіль</title>
        <meta property="og:url" content={`https://brazhkovich.com/profile`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Бражкович | Профіль`} />
        <meta property="og:image" content={imageB} />
      </Head>
        <div className={styles.emailVerify}>
            {
                !user?.emailVerified && (
                    <div>
                        <h3>Підтвердіть свій Email для того щоб використовувати повний функціонал ресурсу</h3>
                    </div>
                )
            }
        </div>
      <div className={styles.leftSide}>

        <div className={styles.name}>
          <h2>{user?.name}</h2>
          <h3>{user?.email}</h3>
        </div>
        <button onClick={() => signOut()}>Вийти</button>
      </div>
      {/*<div className={styles.socMedia}>*/}
      {/*  <h2>Ваші соцальні мережі: У розробці</h2>*/}
      {/*  <div className={styles.socDivs}>*/}
      {/*    <div className={styles.socIn}>*/}
      {/*      <div className={styles.socDivIn}>*/}
      {/*        <h2>Telegram</h2>*/}
      {/*        <TelegramIcon style={{ color: "#0088CC", cursor: "pointer" }} />*/}
      {/*      </div>*/}
      {/*      <button className={styles.socInButton}>*/}
      {/*        <h3>Додати посилання</h3>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    <div className={styles.socIn}>*/}
      {/*      <div className={styles.socDivIn}>*/}
      {/*        <h2>Instagram</h2>*/}
      {/*        <InstagramIcon style={{ cursor: "pointer" }} />*/}
      {/*      </div>*/}
      {/*      <button className={styles.socInButton}>*/}
      {/*        <h3>Додати посилання</h3>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    <div className={styles.socIn}>*/}
      {/*      <div className={styles.socDivIn}>*/}
      {/*        <h2>Twitter</h2>*/}
      {/*        <TwitterIcon style={{ color: "#1DA1F2", cursor: "pointer" }} />*/}
      {/*      </div>*/}
      {/*      <button className={styles.socInButton}>*/}
      {/*        <h3>Додати посилання</h3>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    <div className={styles.socIn}>*/}
      {/*      <div className={styles.socDivIn}>*/}
      {/*        <h2>Facebook</h2>*/}
      {/*        <FacebookIcon style={{ color: "#4267B2", cursor: "pointer" }} />*/}
      {/*      </div>*/}
      {/*      <button className={styles.socInButton}>*/}
      {/*        <h3>Додати посилання</h3>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={styles.rightSide}>
        {postsList?.map((item: News) => (
          <div key={item?.url} className={styles.card}>
            <div className={styles.image}>
              <div className={styles.cardImage}>
                <Image
                    src={item?.image}
                    alt={item?.title}
                    width={300}
                    height={400}
                />
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
                `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/news/newsprof/` + session?.user.id,
                {
                  params: {
                    page: page,
                  },
                }
              );

              setPostsList([...postsList, ...getNextPosts.data]);
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

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const user = await axios.get(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/profile/` + session.user.id
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/news/newsprof/` + session.user.id,
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
