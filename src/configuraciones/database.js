import { Sequelize } from "sequelize";

const { DB_NAME, DB_USER, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

const database = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión establecida con la base de datos");

        await sequelize.sync({ force: false });
        console.log("Modelos sincronizados con la base de datos");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1);
    }
};

export { sequelize, database };
