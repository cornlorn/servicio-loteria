import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { database } from "./configuraciones/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.listen(PORT, async () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
    await database();
});
