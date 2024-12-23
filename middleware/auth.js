const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acceso no autorizado" });

  try {
    const decoded = jwt.verify(token, "mi_clave_secreta"); // Cambia esta clave
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = verificarToken;
