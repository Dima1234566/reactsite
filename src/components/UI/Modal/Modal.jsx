import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

function Modal({ film, onClose }) {
  const [active, setActive] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [watch, setWatch] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const storedWatch = JSON.parse(localStorage.getItem("watch")) || [];
    const storedQueue = JSON.parse(localStorage.getItem("queue")) || [];
    setWatch(storedWatch);
    setQueue(storedQueue);
  }, [refresh]);

  useEffect(() => {
    if (queue.includes(film.id)) {
      setActive("queue");
    } else if (watch.includes(film.id)) {
      setActive("watch");
    }
  }, [queue, watch, film.id]);

  const handleWatch = (id) => {
    if (watch.includes(id)) {
      const updatedWatch = watch.filter((item) => item !== id);
      setWatch(updatedWatch);
      localStorage.setItem("watch", JSON.stringify(updatedWatch));
      setActive("");
    } else {
      if (queue.includes(id)) {
        const updatedQueue = queue.filter((item) => item !== id);
        setQueue(updatedQueue);
        localStorage.setItem("queue", JSON.stringify(updatedQueue));
      }

      const updatedWatch = [...watch, id];
      setWatch(updatedWatch);
      localStorage.setItem("watch", JSON.stringify(updatedWatch));
      setActive("watch");
    }
  };

  const handleQueue = (id) => {
    if (queue.includes(id)) {
      const updatedQueue = queue.filter((item) => item !== id);
      setQueue(updatedQueue);
      localStorage.setItem("queue", JSON.stringify(updatedQueue));
      setActive("");
    } else {
      if (watch.includes(id)) {
        const updatedWatch = watch.filter((item) => item !== id);
        setWatch(updatedWatch);
        localStorage.setItem("watch", JSON.stringify(updatedWatch));
      }

      const updatedQueue = [...queue, id];
      setQueue(updatedQueue);
      localStorage.setItem("queue", JSON.stringify(updatedQueue));
      setActive("queue");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <div className={styles.modalBody}>
          <div className={styles.imageContainer}>
            <img
              src={`${process.env.REACT_APP_IMG_URL}${film.poster_path}`}
              alt={film.title}
            />
          </div>

          <div className={styles.details}>
            <h2 className={styles.title}>{film.title}</h2>
            <p className={styles.rating}>
              <strong>Рейтинг:</strong>{" "}
              <span className={styles.ratingNumber}>{film.vote_average}</span>
              <span className={styles.ratingVotes}>
                {" "}
                / {film.vote_count} голосів
              </span>
            </p>
            <p className={styles.popularity}>
              <strong>Популярність:</strong> {film.popularity}
            </p>
            <p className={styles.originalTitle}>
              <strong>Оригінальна назва:</strong> {film.original_title}
            </p>
            <p className={styles.genres}>
              <strong>Жанри:</strong> {film.genres.join(", ")}
            </p>
            <p className={styles.overview}>
              <strong>Опис:</strong>
              {film.overview}
            </p>
            <div className={styles.buttonCont}>
              <button
                className={
                  active === "watch" ? styles.active : styles.modalBtrn
                }
                onClick={() => handleWatch(film.id)}
              >
                ADD TO WATCHED
              </button>
              <button
                className={
                  active === "queue" ? styles.active : styles.modalBtrn
                }
                onClick={() => handleQueue(film.id)}
              >
                ADD TO QUEUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
