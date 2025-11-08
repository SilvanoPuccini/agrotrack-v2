const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Importar conexión DB
const connection = require('./db');

// Middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Routes
const contactosRoutes = require('./routes/contactos');

// Configuración
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware personalizado
app.use(logger);

// Rutas
app.use('/api/contactos', contactosRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint de verificación (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Manejo de errores (debe ir al final)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  
  // Probar conexión a DB
  connection.query('SELECT 1', (err) => {
    if (err) {
      console.error('❌ Error conectando a MySQL:', err.message);
    } else {
      console.log('✅ Conexión exitosa a MySQL');
    }
  });
});

module.exports = app;
