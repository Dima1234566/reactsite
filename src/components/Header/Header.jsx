import styles from "./Header.module.css";
import logo from "../../logo.svg";
import React, { useState } from "react";
import search from "../../search.png";
import axios from "axios";

function Header() {
  // const [searchFilm, setSearchFilm] = useState("");
  // const [page, setPage] = useState(1);

  // const fetchFilms = async () => {
  //   try {
  //     if (!searchFilm.trim()) {
  //       console.warn("Search term is empty.");
  //       return;
  //     }

  //     const response = await axios.get(
  //       `${process.env.REACT_APP_SEARCH_URL}${searchFilm}&page=${page}`
  //     );

  //     const data = response.data;
  //     localStorage.setItem("search", JSON.stringify(data));
  //     console.log("Search results saved to localStorage:", data);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   }
  // };

  // const handleSearch = (event) => {
  //   setSearchFilm(event.target.value);
  //   setPage(1);
  // };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/">
          <div className={styles.logo}>
            <img src={logo} alt="Logo" width={24} height={24} />
            <span>Freeteka</span>
          </div>
        </a>

        {/* <div className={styles.search}>
          <input
            type="text"
            placeholder="Movie search"
            onChange={(event) => handleSearch(event)}
          />
          <span className={styles.search_img} onClick={fetchFilms}>
            <img src={search} alt="Search" width={12} height={12} />
          </span>
        </div> */}

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
