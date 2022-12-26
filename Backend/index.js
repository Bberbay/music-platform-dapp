import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";
import musicsRoutes from "./routes/musics.js";

import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors()) 

app.use(bodyParser.json());

app.use("/music", musicsRoutes);
app.use("/people", usersRoutes);

app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));