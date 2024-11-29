import * as React from "react";
import styles from "./PayPage.module.scss";
import { Link } from "react-router-dom";

function PayPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>ОПЛАТА...</div>
      <div className={styles.list}>
        <Link to="/" className={styles.title}>
         Go to Main Page
        </Link>
      </div>
    </div>
  );
}

export default PayPage;
