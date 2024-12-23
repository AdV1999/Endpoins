const express = require("express");
const Producto = require("../models/producto");
const router = express.Router();

// Crear Producto
router.post("/", async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const producto = await Producto.create({ nombre, precio, descripcion });
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar Producto
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    const producto = await Producto.findByPk(id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });

    producto.nombre = nombre;
    producto.precio = precio;
    producto.descripcion = descripcion;
    await producto.save();

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los Productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
