import * as React from "react";
import styles from "./ContactPage.module.scss";
import { Link } from "react-router-dom";

function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Страница Контактной Инофрмации</div>
      <div className={styles.list}>
        <Link to="/chat" className={styles.title}>
          Назад
        </Link>
      </div>
      <div className={styles.form}>FORM COMPONENT</div>
    </div>
  );
}

export default ContactPage;
