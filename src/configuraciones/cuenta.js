import bcrypt from "bcrypt";
import { Usuario } from "../modelos/usuario.modelo.js";

export const crearCuenta = async () => {
    const correo = "admin@example.com";
    const contrasena = "12345678";
    const permiso = "admin";

    try {
        const existente = await Usuario.findOne({ where: { correo } });
        if (existente) {
            console.log("El correo ya está registrado:", correo);
            return;
        }

        const contrasenaHasheada = await bcrypt.hash(contrasena, 10);
        await Usuario.create({
            nombre: "Roberto",
            apellido: "Gonzalez",
            correo,
            contrasena: contrasenaHasheada,
            permiso,
        });

        console.log("Cuenta de administrador creada:", correo);
    } catch (error) {
        console.error("Error verificando existencia de usuario:", error);
    }
};
