import * as React from "react";
import styles from "./TaskPage.module.scss";
import { Link } from "react-router-dom";

function TaskPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Tasks Page</div>
      <div className={styles.list}>
        <Link to="/projects" className={styles.title}>
          Go Back
        </Link>
      </div>
      <div className={styles.form}>FORM COMPONENT</div>
    </div>
  );
}

export default TaskPage;
