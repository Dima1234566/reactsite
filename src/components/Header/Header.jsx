import styles from "./Header.module.css";
import logo from "../../logo.svg";
import search from "../../search.png";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/">
          <div className={styles.logo}>
            <img src={logo} alt="Logo" width={24} height={24} />
            <span>Filmoteka</span>
          </div>
        </a>

        <div className={styles.search}>
          <input type="text" placeholder="Movie search" />
          <span className={styles.search_img}>
            <img src={search} alt="Search" width={12} height={12} />
          </span>
        </div>

        <nav>
          <ul className={styles.navigation}>
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/library">MY LIBRARY</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
