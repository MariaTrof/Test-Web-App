import * as React from "react";
import axios from "axios";
import styles from "./AuthPage.module.scss";

const SERVER_URL = "http://localhost:5005";

function AuthPage() {
  const HandleClick = () => {
    axios
      .get(`${SERVER_URL}/auth`)
      .then((response) => {
        window.location.href = response.request.responseURL;
      })
      .catch((error) => {
        console.error("Error while trying log in:", error);
      });
  };

  return (
    <div classNames={styles.container}>
      <div classNames={styles.head}>AUTHORIZE</div>
      <div classNames={styles.box}>
        <button onClick={HandleClick}>LOG IN</button>
      </div>
    </div>
  );
}

export default AuthPage;
