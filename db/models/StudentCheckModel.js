const Sequelize = require("sequelize");
const db = require("../config");

const StudentCheckModel = db.define("StudentIDs", {
  idStudent: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    //type: DataTypes.UUID,
    type: Sequelize.INTEGER,
    unique: true,
  },
  codeStudent: {
    allowNull: false,
    autoIncrement: false,
    //type: DataTypes.UUID,
    type: Sequelize.BIGINT,
    unique: true,
  },
  name: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  password: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  course: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  semester: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  cpf: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  rg: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  sex: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  birthDate: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  linkedin: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  photo: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  lattes: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  dateRegister: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  dateRevalidate: {
    allowNull: true,
    type: Sequelize.STRING,
  },
});

/* db.sync(() => console.log("Banco de dados conectado"));
 */
module.exports = StudentCheckModel;
