import axios from "axios";
import { GetServerSideProps } from "next";
import { FC } from "react";
import LayoutAdmin from "../../../layouts/LayoutAdmin";
import { User } from "../../../types/types";
import styles from "./../../../styles/AdminUsers.module.scss";
type UsersType = {
  users: User[];
};
const Users: FC<UsersType> = ({ users }) => {
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
                <td className={styles.cell}>{user?.role}</td>
                <td className={styles.cell}>Змінити</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutAdmin>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/admin/users");
  return {
    props: {
      users: res?.data,
    },
  };
};
