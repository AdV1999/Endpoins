const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const router = express.Router();

// Login de Usuario
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const usuario = await Usuario.findOne({ where: { username } });

  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  const isValidPassword = bcrypt.compareSync(password, usuario.password);
  if (!isValidPassword)
    return res.status(400).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: usuario.id, username: usuario.username },
    "mi_clave_secreta",
    { expiresIn: "24h" }
  );
  res.json({ token });
});

module.exports = router;
