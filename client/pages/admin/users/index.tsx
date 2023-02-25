import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import Alerts from "../../../components/Alerts";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import { User } from "../../../types/types";
import { toastProps } from "../../login";
import styles from "./../../../styles/AdminUsers.module.scss";
type UsersType = {
  users: User[];
};
const Users: FC<UsersType> = ({ users }) => {
  const [alertList, setAlertList] = useState<toastProps[]>([]);
  let toastProp = null;

  const handleChangeAdmin = async (e: any, id: string) => {
    e.preventDefault();
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/admin/users/` + id,
      {
        role: e.target.value,
      }
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

  return (
    <LayoutAdmin>
      <div className={styles.wrap}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th className={styles.cell}>№</th>
              <th className={styles.cell}>Імʼя</th>
              <th className={styles.cell}>Email</th>
              <th className={styles.cell}>Роль</th>
              <th className={styles.cell}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className={styles.td} key={user?._id}>
                <td className={styles.cell}>{index}</td>
                <td className={styles.cell}>{user?.name}</td>
                <td className={styles.cell}>{user?.email}</td>
                <td className={styles.cell}>
                  <select
                    name="Admin"
                    id="Admin"
                    onChange={(e) => handleChangeAdmin(e, user?._id)}
                  >
                    <option value="admin" selected={user?.role === "admin"}>
                      Адмін
                    </option>
                    <option value="user" selected={user?.role === "user"}>
                      Користувач
                    </option>
                  </select>
                </td>
                <td className={styles.cell}>Змінити</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Alerts
          toastList={alertList}
          position={"bottom-right"}
          setAlertList={setAlertList}
        />
      </div>
    </LayoutAdmin>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps = async () => {
  let res = null;
  try {
    res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/admin/users`
    );
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      users: res?.data,
    },
  };
};
