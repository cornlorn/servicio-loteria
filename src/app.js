import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { crearCuenta } from "./configuraciones/cuenta.js";
import { database } from "./configuraciones/database.js";
import usuarioRutas from "./rutas/usuario.ruta.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/usuarios", usuarioRutas);

app.listen(PORT, async () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
    await database();
    await crearCuenta();
});
