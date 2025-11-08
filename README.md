# AgroTrack V2.0 🌾

**Materia:** Programación Web II  
**Alumno:** Silvano Puccini  
**Legajo:** 35829287  
**Carrera:** Tecnicatura en Desarrollo de Aplicaciones Informáticas  
**Fecha:** Noviembre 2025

---

## 📋 Descripción

AgroTrack V2.0 es la evolución del proyecto desarrollado en la AO1. Implementa un servidor web con **Express.js** y persistencia de datos en **MySQL**, permitiendo la gestión de consultas de contacto a través de una **API REST**.

### Principales mejoras vs AO1:
- ✅ Framework **Express** en lugar de módulo HTTP nativo
- ✅ **Arquitectura modular** con rutas y middleware separados
- ✅ Persistencia en **MySQL** en lugar de archivos
- ✅ **API REST** con respuestas JSON estructuradas
- ✅ **Validaciones** de datos en servidor
- ✅ **Manejo de errores** centralizado
- ✅ **Variables de entorno** para configuración sensible
- ✅ Archivos HTML **estáticos** (no generados dinámicamente)

---

## 🚀 Tecnologías Utilizadas

- **Node.js** v22.x
- **Express.js** v4.x
- **MySQL** v8.x
- **dotenv** - Gestión de variables de entorno
- Módulo nativo **mysql**

---

## 📁 Estructura del Proyecto
```
agrotrack-v2/
├── app.js                  # Servidor principal con Express
├── db.js                   # Conexión a base de datos MySQL
├── package.json            # Dependencias del proyecto
├── package-lock.json
├── .env                    # Variables de entorno (no versionado)
├── .env.example            # Ejemplo de configuración
├── .gitignore              # Archivos ignorados por Git
├── README.md               # Documentación del proyecto
├── middleware/
│   ├── logger.js          # Logger de peticiones HTTP
│   └── errorHandler.js    # Manejo centralizado de errores
├── routes/
│   └── contactos.js       # Rutas de la API REST
├── public/                # Archivos estáticos (frontend)
│   ├── index.html         # Página principal
│   ├── formulario.html    # Formulario de contacto
│   ├── listado.html       # Listado de contactos
│   └── styles.css         # Estilos CSS
└── sql/
    └── schema.sql         # Script de creación de BD
```

---

## ⚙️ Instalación y Configuración

### **1. Clonar el repositorio:**
```bash
git clone https://github.com/SilvanoPuccini/agrotrack-v2.git
cd agrotrack-v2
```

### **2. Instalar dependencias:**
```bash
npm install
```

### **3. Configurar variables de entorno:**

Crear archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=agrotrack
```

### **4. Crear la base de datos:**

Ejecutar el script SQL incluido:
```bash
mysql -u root -p < sql/schema.sql
```

O manualmente dentro de MySQL:
```sql
source sql/schema.sql;
```

### **5. Iniciar el servidor:**
```bash
npm start
```

O directamente con Node:
```bash
node app.js
```

El servidor estará disponible en: **http://localhost:3000**

---

## 🛣️ Endpoints de la API

### **1. Health Check**

Verifica el estado del servidor.

**Request:**
```http
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

---

### **2. Listar Contactos**

Obtiene todos los contactos registrados ordenados por fecha (más recientes primero).

**Request:**
```http
GET /api/contactos
```

**Response exitosa (200):**
```json
{
  "error": false,
  "datos": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "telefono": "1234567890",
      "mensaje": "Consulta sobre servicios agrícolas",
      "created_at": "2025-11-06T16:49:45.000Z"
    }
  ],
  "total": 1
}
```

---

### **3. Crear Contacto**

Registra un nuevo contacto en el sistema.

**Request:**
```http
POST /api/contactos
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "María García",
  "email": "maria@example.com",
  "telefono": "0987654321",
  "mensaje": "Información sobre análisis de suelo"
}
```

**Validaciones:**
- Todos los campos son obligatorios
- El email debe tener formato válido (regex)
- Los campos no pueden estar vacíos

**Response exitosa (201):**
```json
{
  "error": false,
  "mensaje": "Contacto creado exitosamente",
  "id": 2
}
```

**Response de error (400):**
```json
{
  "error": true,
  "mensaje": "Todos los campos son obligatorios (nombre, email, telefono, mensaje)"
}
```
```json
{
  "error": true,
  "mensaje": "El formato del email no es válido"
}
```

---

## 🧪 Pruebas con cURL

### **Health Check:**
```bash
curl http://localhost:3000/health
```

### **Listar contactos:**
```bash
curl http://localhost:3000/api/contactos
```

### **Crear contacto:**
```bash
curl -X POST http://localhost:3000/api/contactos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "email": "test@example.com",
    "telefono": "555-1234",
    "mensaje": "Mensaje de prueba desde cURL"
  }'
```

---

## 📮 Colección Postman

Se incluye una colección de Postman con todas las pruebas de los endpoints en el archivo:
```
AgroTrack-V2.postman_collection.json
```

### Para importarla:
1. Abrir Postman
2. Click en **Import**
3. Seleccionar el archivo JSON
4. Usar las requests pre-configuradas

---

## 🗄️ Base de Datos

### **Nombre:** `agrotrack`

### **Tabla: contactos**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `nombre` | VARCHAR(100) NOT NULL | Nombre completo del contacto |
| `email` | VARCHAR(100) NOT NULL | Email del contacto |
| `telefono` | VARCHAR(20) NOT NULL | Teléfono del contacto |
| `mensaje` | TEXT NOT NULL | Mensaje o consulta |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

### **Script de creación:**

Disponible en `sql/schema.sql`

---

## 🛡️ Middleware Implementado

### **1. Logger (`middleware/logger.js`)**

Registra todas las peticiones HTTP en consola:
```
[2025-11-06T17:00:00.000Z] GET /api/contactos
[2025-11-06T17:00:05.000Z] POST /api/contactos
```

### **2. Error Handler (`middleware/errorHandler.js`)**

Maneja errores de forma centralizada y devuelve respuestas JSON estructuradas:
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

---

## 📦 Dependencias
```json
{
  "express": "^4.18.2",
  "mysql": "^2.18.1",
  "dotenv": "^16.3.1"
}
```

### Instalar:
```bash
npm install
```

---

## 🎨 Frontend

El frontend está compuesto por archivos HTML estáticos con CSS puro:

- **index.html**: Página principal con menú de navegación
- **formulario.html**: Formulario para crear contactos (con JavaScript para consumir la API)
- **listado.html**: Visualización de contactos registrados (carga dinámica desde la API)
- **styles.css**: Estilos con diseño verde inspirado en temática agrícola

### Características:
- ✅ Diseño responsive
- ✅ Colores verdes corporativos (#27ae60, #2ecc71)
- ✅ Consumo de API con Fetch API
- ✅ Validación de formularios
- ✅ Mensajes de éxito/error

---

## 🔒 Seguridad

- ✅ Variables sensibles en `.env` (no versionadas)
- ✅ Validación de datos en servidor
- ✅ Prepared statements en queries SQL (prevención de SQL Injection)
- ✅ Manejo centralizado de errores

---

## 📝 Notas Importantes

### **Correcciones aplicadas desde AO1:**

1. **No generar HTML dinámicamente**: Los archivos HTML son estáticos, el servidor solo maneja datos JSON.

2. **No usar if/elsif para routing**: Se utiliza Express Router con arquitectura modular y controladores separados.

---

## 🚀 Scripts Disponibles
```json
{
  "start": "node app.js"
}
```

Ejecutar:
```bash
npm start
```

---

## 👨‍💻 Autor

**Silvano Puccini**  
Tecnicatura en Desarrollo de Aplicaciones Informáticas  
Legajo: 35829287  
Programación Web II - 2025

---

## 📄 Licencia

Este proyecto es de uso académico para la materia Programación Web II.

---

## ✅ Checklist de Entrega

- [x] Servidor Express configurado
- [x] API REST con GET y POST
- [x] Base de datos MySQL
- [x] Validaciones implementadas
- [x] Middleware de logger y errores
- [x] Variables de entorno
- [x] Archivos estáticos
- [x] README completo
- [x] Colección Postman
- [x] `.env.example`
- [x] `.gitignore`
- [x] Repositorio público en GitHub

---
