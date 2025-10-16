import { DataTypes } from "sequelize";
import { sequelize } from "../configuraciones/database.js";

export const Role = sequelize.define(
    "Role",
    { nombre: { type: DataTypes.STRING, allowNull: false, unique: true } },
    {
        tableName: "roles",
        timestamps: true,
        createdAt: "creado",
        updatedAt: "actualizado",
        deletedAt: false,
    },
);
