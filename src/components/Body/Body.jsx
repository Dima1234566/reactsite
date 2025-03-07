import { useEffect, useState } from "react";
import styles from "./Body.module.css";
import axios from "axios";
import Card from "../UI/Card/Card";
import search from "../../search.png";

function Body() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchFilm, setSearchFilm] = useState("");
  const [page, setPage] = useState(1);

  const fetchFilms = async () => {
    try {
      if (!searchFilm.trim()) {
        console.warn("Search term is empty.");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_SEARCH_URL}${searchFilm}&page=${page}`
      );

      const data = response.data.results;
      setTotalPages(response.data.total_pages);
      setFilms(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchFilm(event.target.value);
    setPage(1);
  };

  const fetchData = async (page) => {
    try {
      const search = JSON.parse(localStorage.getItem("search"));

      if (search && search.result) {
        setFilms(search.result);
        setTotalPages(search.total_pages);
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API}&page=${currentPage}`
        );
        setFilms(response.data.results);
        setTotalPages(response.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (page) => {
    paginate(page);
  };

  const handleFirst = () => {
    paginate(1);
  };

  const handleLast = () => {
    paginate(totalPages);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / 10) * 10;
    return new Array(10)
      .fill(0)
      .map((_, index) => start + index + 1)
      .filter((page) => page <= totalPages);
  };

  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Movie search"
            onChange={(event) => handleSearch(event)}
          />
          <span className={styles.search_img} onClick={fetchFilms}>
            <img src={search} alt="Search" width={12} height={12} />
          </span>
        </div>
        <div className={styles.cards}>
          {films.length > 0 ? (
            films.map((film, index) => (
              <div key={index}>
                <Card film={film} />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className={styles.pagination}>
          <button disabled={currentPage === 1} onClick={handleFirst}>
            {"<<"}
          </button>
          <button disabled={currentPage === 1} onClick={handlePrev}>
            {"<"}
          </button>
          {getPaginationGroup().map((item, index) => (
            <button
              className={currentPage === item ? styles.active : ""}
              key={index}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={handleNext}>
            {">"}
          </button>
          <button disabled={currentPage === totalPages} onClick={handleLast}>
            {">>"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Body;
