import * as React from "react";
import styles from "./MainPage.module.scss";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Main Page</div>
      <div className={styles.list}>
        <Link to="/projects" className={styles.title}>
          Go to Projects
        </Link>
        <Link to="/tasks" className={styles.title}>
         Go to Tasks
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
