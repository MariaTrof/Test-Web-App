import * as React from 'react';
import styles from "./ProjectList.module.scss";
import { Link } from "react-router-dom";
import Projects from '../../components/Projects/Projects';

function ProjectList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Project List Page</div>
      <div className={styles.list}>
        <Link to="/tasks" className={styles.title}>
          Go to Tasks Page
        </Link>
      </div>
      <Projects />
    </div>
  );
}

export default ProjectList;
