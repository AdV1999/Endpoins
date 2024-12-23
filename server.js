const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const productoRoutes = require("./routes/productos");
const authRoutes = require("./routes/auth");
const verificarToken = require("./middleware/auth");

const app = express();

app.use(bodyParser.json());

// Rutas públicas
app.use("/api/auth", authRoutes);

// Rutas protegidas (requieren autenticación)
app.use("/api/productos", verificarToken, productoRoutes);

// Conectar a la base de datos y arrancar el servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
});
