import axios from "axios";
import * as React from "react";
import { useState } from "react";
import styles from "./ProjectForm.module.scss";

//name обязательный, остальные по желанию
const SERVER_URL = "http://localhost:5005";

function ProjectItem() {
  const [name, setName] = useState();
  const [color, setColor] = useState();
  const [fav, setFav] = useState();
  const [team, setTeam] = useState();
  const [share, setShare] = useState();
  const [view, setView] = useState();

  const HandleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/projects`, {
        name: name,
        color: color,
        is_shared: share,
        is_favorite: fav,
        is_team_inbox: team,
        view_style: view,
      });
      if (response.status === 200) {
        alert("You`ve created a NEW Project!");
      } else {
        throw new error("Error in creating new project");
      }
    } catch (error) {
      console.error("Error in form submitting:", error.message);
      alert("Error in form submitting!");
    }
  };

  return (
    <div classNames={styles.container}>
      <div classNames={styles.head}>Add Project Form</div>
      <div classNames={styles.box}>
        <form onSubmit={HandleSubmit}>
          <input
            placeholder="Project Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Icon Color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            placeholder="View Style"
            type="text"
            value={view}
            onChange={(e) => setView(e.target.value)}
          />
          <label>
            Make Favorite
            <input
              type="checkbox"
              checked={fav}
              onChange={() => setFav(!fav)}
            />
          </label>

          <label>
            Team Project
            <input
              type="checkbox"
              checked={team}
              onChange={() => setTeam(!team)}
            />
          </label>

          <label>
            Is shared
            <input
              type="checkbox"
              checked={share}
              onChange={() => setShare(!share)}
            />
          </label>

          <button type="submit"> Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ProjectItem;
