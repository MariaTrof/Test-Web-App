import * as React from "react";
import styles from "./MainPage.module.scss";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Главная Страница</div>
      <div className={styles.list}>
        <Link to="/chat" className={styles.title}>
          Перейти на страницу выбора сертификата
        </Link>
        <Link to="/profile" className={styles.title}>
          Перейти на страницу для внесения контактной информации
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
