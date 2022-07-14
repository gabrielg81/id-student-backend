const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_DB || "db",
  process.env.DATABASE_USER || "user",
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: 3306,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("conexão realizada com sucesso.");
  })
  .catch((err) => {
    console.log("Falha na conexão.", err);
  });

module.exports = sequelize;
