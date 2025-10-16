import { Router } from "express";
import {
    ingresarUsuario,
    registrarUsuario,
} from "../controladores/usuario.controlador.js";
import {
    validarIngresoUsuario,
    validarRegistroUsuario,
} from "../validaciones/usuario.validacion.js";

const router = Router();

router.post("/registrar", validarRegistroUsuario, registrarUsuario);
router.post("/ingresar", validarIngresoUsuario, ingresarUsuario);

export default router;
