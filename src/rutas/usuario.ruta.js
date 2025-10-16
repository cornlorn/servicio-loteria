import { Router } from "express";
import { validarRegistroUsuario } from "../validaciones/usuario.validacion.js";
import { registrarUsuario } from "../controladores/usuario.controlador.js";

const router = Router();

router.post("/registrar", validarRegistroUsuario, registrarUsuario);

export default router;
