import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import styles from "./Card.module.css";

function Card({ film }) {
  const [genres, setGenres] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const openModal = (film) => {
    if (!film.genres[0].name) {
      const filmWithGenres = {
        ...film,

        genres: genres
          .filter((genre) => film.genre_ids.includes(genre.id))
          .map((genre) => genre.name),
      };
      setSelectedFilm(filmWithGenres);
      setModalOpen(true);
    } else {
      const filmWithGenres = {
        ...film,

        genres: film.genres.map((genre) => genre.name),
      };
      setSelectedFilm(filmWithGenres);
      setModalOpen(true);
    }

    const closeModal = () => {
      setModalOpen(false);
      setSelectedFilm(null);
    };
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFilm(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SEARCH}${process.env.REACT_APP_API}`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchData();
  }, []);
  let selectedGenres;
  if (film.genres && !film.genres[0].name) {
    selectedGenres = genres
      .filter((genre) => film.genre_ids.includes(genre.id))
      .map((genre) => genre.name);
  } else {
    selectedGenres = genres.map((genre) => genre.name);
  }
  return (
    <main className={styles.card}>
      <div className={styles.container} onClick={() => openModal(film)}>
        <img
          src={`${process.env.REACT_APP_IMG_URL}${film.poster_path}`}
          alt={film.title}
          width={395}
          height={574}
        />
        <div className={styles.about}>
          <h2 className={styles.name}>{film.title.toUpperCase()}</h2>
          <div className={styles.genre}>
            {selectedGenres.map((el) => (
              <p key={el}>{el.toUpperCase()}</p>
            ))}{" "}
            <p>|</p> <p>{film.release_date.split("-")[0]}</p>
          </div>
        </div>
      </div>

      {modalOpen && selectedFilm && (
        <Modal film={selectedFilm} onClose={closeModal} />
      )}
    </main>
  );
}

export default Card;
