const { Sequelize } = require("sequelize");

// Configuración de Sequelize para SQL Server
const sequelize = new Sequelize(
  "mssql://ADEV@localhost:1433/Juan_GDA00523_OT_Adolfo_Damian",
  {
    dialect: "mssql",
    host: "localhost",
    port: 1433,
    logging: false,
  }
);

module.exports = sequelize;
