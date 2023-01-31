import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./../styles/Navbar.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.header_title}>
        <Link href={"/"}>
          <h2 className={styles.title}>Бражкович</h2>
        </Link>
        <Link href={"/"}>
          <h2 className={styles.title_small}>Медіа</h2>
        </Link>
      </div>
      <div className={styles.menu}>
        <Link href={"/"}>
          <h3>Головна</h3>
        </Link>
        <Link href={"/category/war"}>
          <h3>Новини</h3>
        </Link>
        <Link href={"/suggest"}>
          <h3>Бєсєдка</h3>
        </Link>

        <div className={styles.supportBtn}>
            <h4>
            Підтримайте нас
            </h4>
        </div>

        <div className={styles.header_icons}>
          <Link href={"/profile"}>
            <PersonIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
