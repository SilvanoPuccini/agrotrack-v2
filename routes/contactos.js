const express = require('express');
const router = express.Router();
const db = require('../db');

// Validación de email
const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// GET /api/contactos - Obtener todos los contactos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM contactos ORDER BY created_at DESC';
  
  db.query(query, (error, resultados) => {
    if (error) {
      return res.status(500).json({
        error: true,
        mensaje: 'Error al obtener contactos',
        detalle: error.message
      });
    }
    
    res.json({
      error: false,
      datos: resultados,
      total: resultados.length
    });
  });
});

// POST /api/contactos - Crear nuevo contacto
router.post('/', (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;
  
  // Validaciones
  if (!nombre || !email || !telefono || !mensaje) {
    return res.status(400).json({
      error: true,
      mensaje: 'Todos los campos son obligatorios (nombre, email, telefono, mensaje)'
    });
  }
  
  if (!validarEmail(email)) {
    return res.status(400).json({
      error: true,
      mensaje: 'El formato del email no es válido'
    });
  }
  
  const query = 'INSERT INTO contactos (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)';
  
  db.query(query, [nombre, email, telefono, mensaje], (error, resultado) => {
    if (error) {
      return res.status(500).json({
        error: true,
        mensaje: 'Error al crear contacto',
        detalle: error.message
      });
    }
    
    res.status(201).json({
      error: false,
      mensaje: 'Contacto creado exitosamente',
      id: resultado.insertId
    });
  });
});

module.exports = router;
