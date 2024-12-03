import { useEffect, useState } from "react";
import styles from "./Body.module.css";
import axios from "axios";
import Card from "../UI/Card/Card"

function Body() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
try {
      const fetchData = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API}`
          );
          setFilms(response.data.results);

      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
    
    }, []);
    return (
    <main className={styles.body}>
            <div className={styles.container}>
                
                {films.length > 0 && 
                    films.map((film, index) => (
                        <div key={index}>
                            <Card film={film} />
                          </div>
                    )
                        )}
                
          </div>
    </main>);
}
export default Body;

