import { Router } from "express";
import {
    ingresarUsuario,
    registrarUsuario,
} from "../controladores/usuario.controlador.js";
import { verificarTokenOpcional } from "../middlewares/autenticacion.middleware.js";
import {
    validarIngresoUsuario,
    validarRegistroUsuario,
} from "../validaciones/usuario.validacion.js";

const router = Router();

router.post(
    "/registrar",
    verificarTokenOpcional,
    validarRegistroUsuario,
    registrarUsuario,
);
router.post("/ingresar", validarIngresoUsuario, ingresarUsuario);

export default router;
