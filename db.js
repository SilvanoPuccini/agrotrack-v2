const mysql = require('mysql');
require('dotenv').config();

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conexion.connect((error) => {
    if (error) {
        console.error('❌ Error conectando a MySQL:', error.message);
        return;
    }
    console.log('✅ Conectado a MySQL correctamente');
});

module.exports = conexion;
