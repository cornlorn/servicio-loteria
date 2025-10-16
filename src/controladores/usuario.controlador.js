/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */

import { validationResult } from "express-validator";
import { Usuario } from "../modelos/usuario.modelo";

export const registrarUsuario = async (request, response) => {
    try {
        const { nombre, correo, contrasena } = request.body;

        const errores = validationResult(request);

        if (!errores.isEmpty()) {
            return response
                .status(400)
                .json({ errores: errores.array().map((err) => err.msg) });
        }

        const usuarioExistente = await Usuario.findOne({ where: { correo } });

        if (usuarioExistente) {
            return response
                .status(400)
                .json({ error: "El correo ya está registrado" });
        }

        const usuario = await Usuario.create({ nombre, correo, contrasena });

        response.status(201).json({ mensaje: "Usuario registrado", usuario });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        response.status(500).json({ error: "Error al registrar usuario" });
    }
};
