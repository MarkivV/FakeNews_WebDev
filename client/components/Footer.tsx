import styles from "./../styles/Footer.module.scss";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Footer = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header_title}>
        <Link href={"/"}>
          <h1 className={styles.title}>Бражкович</h1>
        </Link>
        <Link href={"/"}>
          <h1 className={styles.title_small}>Медіа</h1>
        </Link>
      </div>
      <div className={styles.categories}>
        <ul className={styles.catDiv}>
          <li>
            <h3><Link href={"/category/war"}>Новини</Link></h3>
          </li>
          <li>
            <h3><Link href={"/"}>Головна</Link></h3>
          </li>
          <li>
            <h3><Link href={"/"}>Важливо</Link></h3>
          </li>
          <li>
            <h3><Link href={"/suggest"}>Запропонувати</Link></h3>
          </li>
          <li>
            <h3><Link href={"/profile"}>Профіль</Link></h3>
          </li>
          <li>
            <h3 onClick={()=>signOut()}>Вийти</h3>
          </li>
        </ul>
      </div>
      <div className={styles.about}>
            <p>
              <strong>Бражкович Медіа - </strong>
              це сатиричне онлайн видання яке публікує повністю вигадані новини
              українською мовою
            </p>
            {/* 
          <p>
          Повідомлення, розміщені на сайті Бражкович Медіа, є сатиричними і не мають ніякого відношення до реальності. Ми не несемо відповідальності за будь-які неправдиві чи образливі матеріали, які можуть бути опубліковані на нашому сайті
          </p> */}
        </div>
        <hr />
      <div className={styles.foot}>
        <div className={styles.left_block}>
          <div className={styles.otherInfo}>
            <span>
              Увага! Всі матеріали, розміщені на даному ресурсі, є власністю ТОВ
              "БРАЖКОВИЧ МЕДІА" і можуть бути використані тільки за умови
              посилання на наш ресурс. Повне або часткове відтворення матеріалів
              без виконання наших умов є незаконним і може привести до юридичних
              наслідків. Додатково, будь-ласка, майте на увазі, що наші
              матеріали містять сатиричний контент і є непристойними для деяких
              осіб. Використовуйте їх на свій розсуд.
            </span>
          </div>
        </div>
        <div className={styles.right_block}>
          <div className={styles.otherInfo}>
            <span>
            Дисклеймер: Сайт Бражкович Медіа є платформою для виконання сатиричної журналістики. Всі матеріали, розміщені на нашому сайті, є фантазією та надані виключно для розваги і не мають наміру образити реальних людей або організацій. Будь-ласка, не відносіть їх до реальності і не використовуйте без нашої згоди. Ми не несемо відповідальності за будь-які збитки, які можуть виникнути внаслідок використання нашого сайту.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
