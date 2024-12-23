const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define(
  "Usuario",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

Usuario.beforeCreate((usuario) => {
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(usuario.password, salt);
});

module.exports = Usuario;
