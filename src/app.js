import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { database } from "./configuraciones/database.js";
import usuarioRutas from "./rutas/usuario.ruta.js";
import { Usuario } from "./modelos/usuario.modelo.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/usuarios", usuarioRutas);

app.listen(PORT, async () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
    await database();
});

async function crearAdminPorDefecto() {
    const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@example.com";
    const password = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";
    const permiso = "admin";

    try {
        const existente = await Usuario.findOne({ where: { correo: email } });
        if (existente) {
            console.log("Admin por defecto ya existe:", email);
            return;
        }

        const contrasenaHasheada = await bcrypt.hash(password, 10);
        await Usuario.create({
            nombre: "Admin",
            apellido: "PorDefecto",
            correo: email,
            contrasena: contrasenaHasheada,
            permiso,
        });

        console.log("Admin por defecto creado:", email);
    } catch (err) {
        console.error("Error creando admin por defecto:", err);
    }
}

// Llamar después de inicializar la BD / antes o después de app.listen según tu flujo
crearAdminPorDefecto();
