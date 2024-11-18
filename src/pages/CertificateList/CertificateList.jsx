import * as React from 'react';
import styles from "./CertificateList.module.scss";
import { Link } from "react-router-dom";

function CertificateList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Страница Сертификатов</div>
      <div className={styles.list}>
        <Link to="/profile" className={styles.title}>
          Оформить Сертификат
        </Link>
      </div>
    </div>
  );
}

export default CertificateList;
