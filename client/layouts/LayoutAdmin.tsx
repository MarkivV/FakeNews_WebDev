import Link from "next/link";
import { useState } from "react";
import styles from "./../styles/LayoutAdmin.module.scss";

const LayoutAdmin = ({children}: any) => {
  const categories = ["posts", "users", "newpost"];
  const categoriesUkr = ["Головна", "Користувачі", "Новий пост"];
  const [selectedButton, setSelectedButton] = useState(0);

  const handleClick = (id: any) => {
    setSelectedButton(id)
}

  return (
    <div className={styles.wrap}>
      <div className={styles.categories}>
        {categories.map((i: string, index) => (
          <Link href={"/admin/" + categories[index]} key={index}>
            <button
              className={
                index === selectedButton ? styles.active : styles.disable
              }
              onClick={() => handleClick(index)}
            >
              <h2>{categoriesUkr[index]}</h2>
            </button>
          </Link>
        ))}
      </div>
      <div className={styles.children}>
            {children}
      </div>
    </div>
  );
};
export default LayoutAdmin;
