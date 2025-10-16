import { DataTypes } from "sequelize";
import { sequelize } from "../configuraciones/database.js";

export const Usuario = sequelize.define(
    "Usuario",
    {
        nombre: { type: DataTypes.STRING, allowNull: false },
        apellido: { type: DataTypes.STRING, allowNull: false },
        correo: { type: DataTypes.STRING, allowNull: false, unique: true },
        contrasena: { type: DataTypes.STRING, allowNull: false },
    },
    {
        tableName: "usuarios",
        timestamps: true,
        createdAt: "creado",
        updatedAt: "actualizado",
        deletedAt: false,
    },
);
