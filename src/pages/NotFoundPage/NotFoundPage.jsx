import * as React from "react";
import styles from "./NotFoundPage.module.scss";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Страница не найдена — 404</h1>
        <Link className={styles.link} to="/">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
