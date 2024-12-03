import styles from "./HeaderLibrary.module.css";
import logo from "../../logo.svg";
import React, { useState } from "react";

function HeaderLibrary() {
  const [active, setActive] = useState("watch");

  const handleChange = (state) => {
    if (state === "watch") {
      localStorage.setItem("libraryWatch", JSON.stringify(state));
      setActive(state);
    }

    if (state === "queue") {
      localStorage.setItem("libraryWatch", JSON.stringify(state));
      setActive(state);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/">
          <div className={styles.logo}>
            <img src={logo} alt="Logo" width={24} height={24} />
            <span>Filmoteka</span>
          </div>
        </a>

        <div className={styles.buttonCont}>
          <button
            className={active === "watch" ? styles.active : styles.modalBtrn}
            onClick={() => handleChange("watch")}
          >
            WATCHED
          </button>
          <button
            className={active === "queue" ? styles.active : styles.modalBtrn}
            onClick={() => handleChange("queue")}
          >
            QUEUE
          </button>
        </div>

        <nav>
          <ul className={styles.navigation}>
            <li>
              <a href="/">HOME</a>
            </li>
            <li className={styles.line}>
              <a href="/library">MY LIBRARY</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderLibrary;

//librari_header
