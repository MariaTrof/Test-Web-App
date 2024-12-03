import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

//авторизация
const CLIENT_ID = "6ee8b2c87c024f34afaeae27e8eda342";
const CLIENT_SECRET = "7f67a8f7f58b4ff5893bb1fec44c5641";
const REDIRECT_URI = "http://localhost:3000/";

function generateRandomString(length = 30) {
  let result = "";
  const symbols =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const symbolsLength = symbols.length;

  for (let i = 0; i < length; i++) {
    result += symbols.charAt(Math.floor(Math.random() * symbolsLength));
  }
  return result;
}

function generateState() {
  const timestamp = Date.now().toString(36);
  const randomPart = generateRandomString(30);

  return `${timestamp}-${randomPart}`;
}

app.get("/auth", async (req, res) => {
  const state = generateState();
  const scope = "task:add,data:read,data:read_write,data:delete,project:delete";
  const url = new URL("https://todoist.com/oauth/authorize");

  url.searchParams.append("client_id", CLIENT_ID);
  url.searchParams.append("scope", scope);
  url.searchParams.append("state", state);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("redirect_uri", REDIRECT_URI);

  res.redirect(url.toString());
});

app.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(403).send("error: Missing parameters");
  }
  if (state !== sessionStorage.getItem("state")) {
    return res.status(403).send("Invalid state parameter.");
  }
  try {
    const response = await axios.post(
      "https://todoist.com/oauth/access_token",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
        },
      }
    );
    const { access_token, token_type } = response.data;
    req.session.accessToken = access_token;
    res.send(`Успешная авторизация! Ваш токен: ${access_token}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while getting token");
  }
});

//запросы к api
let projectCounter = 0; // Начальное значение счетчика для проектов
let taskCounter = 0; // Начальное значение счетчика для задач

app.post("/projects", async (req, res) => {
  try {
    const accessToken = req.session.accessToken;
    const projectId = ++projectCounter;
    const { name } = req.body;
    const response = await axios.post(
      "https://api.todoist.com/rest/v2/projects",
      { name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ ...response.data, id: projectId });
  } catch (error) {
    console.error("Error in posting projects:", error);
    res.status(500).json({ message: "Произошла ошибка при создании проекта" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const accessToken = req.session.accessToken;
    const taskId = ++taskCounter;
    const { name } = req.body;
    const response = await axios.post(
      "https://api.todoist.com/rest/v2/tasks",
      { name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ ...response.data, id: taskId });
  } catch (error) {
    console.error("Error in posting task:", error);
    res.status(500).json({ message: "Ошибка при создании задания" });
  }
});
app.get("/projects", async (req, res) => {
  try {
    const accessToken = req.session.accessToken;
    const response = await axios.get(
      "https://api.todoist.com/rest/v2/projects",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting projects:", error);
    res
      .status(500)
      .json({ message: "Произошла ошибка при получении проектов" });
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const accessToken = req.session.accessToken;
    const response = await axios.get("https://api.todoist.com/rest/v2/tasks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getting tasks:", error);
    res.status(500).json({ message: "Произошла ошибка при получении заданий" });
  }
});

app.post("/projects", async (req, res) => {
  try {
    const accessToken = req.session.accessToken;
    const projectId = ++projectCounter;
    const response = await axios.post(
      "https://api.todoist.com/rest/v2/projects",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ ...response.data, id: projectId });
  } catch (error) {
    console.error("Error in posting projects:", error);
    res.status(500).json({ message: "Произошла ошибка при создании проекта" });
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const accessToken = req.session.accessToken;
    const taskId = ++taskCounter;
    const response = await axios.post(
      "https://api.todoist.com/rest/v2/tasks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ ...response.data, id: taskId });
  } catch (error) {
    console.error("Error in posting task:", error);
    res.status(500).json({ message: "Ошибка при создании задания" });
  }
});
//обновить + удалить
app.delete("/projects/:projectId", async (req, res) => {
  try {
    const accessToken = req.session.accessToken;
    const todoistProjectId = req.params.projectId; // Реальный идентификатор проекта в Todoist

    const response = await axios.delete(
      `https://api.todoist.com/rest/v2/projects/${todoistProjectId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json( response.data );
  } catch (error) {
    console.error("Error in deleting project:", error);
    res.status(500).json({ message: "Произошла ошибка при удалении проекта" });
  }
});
app.delete("/tasks", async (req, res) => {
  try
  {
    const accessToken = req.session.accessToken;
    const todoistTaskId = req.params.taskId; 

    const response = await axios.delete(
      `https://api.todoist.com/rest/v2/tasks/${ todoistTaskId }`,
      {
        headers: {
          Authorization: `Bearer ${ accessToken }`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json( response.data );
  } catch ( error )
  {
    console.error( "Error in deleting task:", error );
    res.status( 500 ).json( { message: "Произошла ошибка при удалении задачи" } );
  }
});

export default app;
