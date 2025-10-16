import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Usuario } from "../modelos/usuario.modelo.js";

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */

export const registrarUsuario = async (request, response) => {
    try {
        const errores = validationResult(request);
        if (!errores.isEmpty()) {
            return response
                .status(400)
                .json({
                    error: "Datos de entrada inválidos",
                    errores: errores.array().map((err) => err.msg),
                });
        }

        let { nombre, apellido, correo, contrasena, permiso } = request.body;

        correo = correo.toLowerCase().trim();

        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        if (usuarioExistente) {
            return response
                .status(400)
                .json({ error: "El correo ya está registrado" });
        }

        if (typeof permiso !== "undefined") {
            if (!request.usuario) {
                return response
                    .status(401)
                    .json({ error: "No autorizado para asignar permisos" });
            }

            const creador = await Usuario.findByPk(request.usuario.id);
            if (!creador || creador.permiso !== "admin") {
                return response
                    .status(403)
                    .json({ error: "No autorizado para asignar permisos" });
            }
        }

        nombre = nombre.trim();
        apellido = apellido.trim();

        const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

        const usuario = await Usuario.create({
            nombre,
            apellido,
            correo,
            contrasena: contrasenaHasheada,
            permiso,
        });

        const respuesta = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            permiso: usuario.permiso,
        };

        response
            .status(201)
            .json({ mensaje: "Usuario registrado", usuario: respuesta });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        response.status(500).json({ error: "Error interno del servidor" });
    }
};

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */

export const ingresarUsuario = async (request, response) => {
    try {
        const errores = validationResult(request);
        if (!errores.isEmpty()) {
            return response
                .status(400)
                .json({
                    error: "Datos de entrada inválidos",
                    errores: errores.array().map((err) => err.msg),
                });
        }

        const { correo, contrasena } = request.body;

        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return response
                .status(400)
                .json({ error: "Correo o contraseña incorrectos" });
        }

        const contrasenaValida = await bcrypt.compare(
            contrasena,
            usuario.contrasena,
        );
        if (!contrasenaValida) {
            return response
                .status(400)
                .json({ error: "Correo o contraseña incorrectos" });
        }

        const respuesta = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            permiso: usuario.permiso,
        };

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo },
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
        );

        response
            .status(200)
            .json({ mensaje: "Ingreso exitoso", usuario: respuesta, token });
    } catch (error) {
        console.error("Error al ingresar usuario:", error);
        response.status(500).json({ error: "Error interno del servidor" });
    }
};
