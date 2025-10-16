import express from "express";
import "dotenv/config";
import { database } from "./configuraciones/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
    await database();
});
