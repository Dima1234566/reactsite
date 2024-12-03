import styles from "./404.module.css";
function NotFound() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div>
            <h1>404</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
