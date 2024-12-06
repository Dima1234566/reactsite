import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./Librarys.module.css";
import axios from "axios";
import Card from "../UI/Card/Card";
function Librarys() {
  const [watchList, setWatchList] = useState([]);
  const [queueList, setQueueList] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBtn, setActiveBtn] = useState("watch");

  useEffect(() => {
    setInterval(() => {
      const activeStatusBtn = JSON.parse(localStorage.getItem("libraryWatch"));

      setActiveBtn(activeStatusBtn);
    }, 200);
    const watchIds = JSON.parse(localStorage.getItem("watch")) || [];
    const queueIds = JSON.parse(localStorage.getItem("queue")) || [];
    const fetchFilms = async (ids, setList) => {
      if (ids.length === 0) return;

      try {
        const requests = ids.map((id) =>
          axios.get(
            `${process.env.REACT_APP_SEARCH_ID}${id}?language=uk-UA&api_key=${process.env.REACT_APP_API}`
          )
        );
        const responses = await Promise.all(requests);
        const films = responses.map((response) => response.data);
        setList(films);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };
    fetchFilms(watchIds, setWatchList);
    fetchFilms(queueIds, setQueueList);
  }, []);

  const openModal = (film) => {
    setSelectedFilm(film);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFilm(null);
  };
  return (
    <div className={styles.library}>
      {activeBtn === "watch" && (
        <section>
          <div className={styles.container}>
            {watchList.map((film, index) => (
              <div key={index}>
                <Card film={film} />
              </div>
            ))}
          </div>
        </section>
      )}

      {activeBtn === "queue" && (
        <section>
          <div className={styles.container}>
            {queueList.map((film, index) => (
              <div key={index}>
                <Card film={film} />
              </div>
            ))}
          </div>
        </section>
      )}

      {modalOpen && selectedFilm && (
        <Modal film={selectedFilm} onClose={closeModal} />
      )}
    </div>
  );
}

export default Librarys;
