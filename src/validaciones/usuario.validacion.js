import { body } from "express-validator";

export const validarRegistroUsuario = [
    body("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isString()
        .withMessage("El nombre debe ser una cadena de texto"),
    body("apellido")
        .notEmpty()
        .withMessage("El apellido es obligatorio")
        .isString()
        .withMessage("El apellido debe ser una cadena de texto"),
    body("correo")
        .notEmpty()
        .withMessage("El correo es obligatorio")
        .isEmail()
        .withMessage("El correo debe ser válido"),
    body("contrasena")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("permiso")
        .optional()
        .isIn(["admin", "empleado", "cliente"])
        .withMessage("El rol debe ser 'admin', 'empleado' o 'cliente'"),
];

export const validarIngresoUsuario = [
    body("correo")
        .notEmpty()
        .withMessage("El correo es obligatorio")
        .isEmail()
        .withMessage("El correo debe ser válido"),
    body("contrasena").notEmpty().withMessage("La contraseña es obligatoria"),
];
