import * as React from "react";
import styles from "./Layout.module.scss";

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>API React TODO App</header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default Layout;
