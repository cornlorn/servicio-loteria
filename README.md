# 🧩 Servicio REST de lotería

Este proyecto implementa un servicio RESTful para la gestión de loterías, utilizando **Sequelize** como ORM para facilitar la interacción eficiente y segura con una base de datos **MySQL**. Permite realizar operaciones CRUD completas, siguiendo una arquitectura modular basada en el patrón **MVC**.

---

## 🚀 Características

- Endpoints para todas las operaciones CRUD
- Integración de **Sequelize ORM** con **MySQL**
- Environments usando `.env`
- Estructura modular **MVC** (`src/controladores` `src/modelos` `src/rutas`)
- Scripts preconfigurados para desarrollo y producción

---

## 🧩 Estructura del proyecto

```
servicio-loteria/
├── src/
│   ├── configuraciones/  # Configuración de la base de datos
│   ├── controladores/    # Lógica de las operaciones CRUD
│   ├── middlewares/      # Middlewares
│   ├── modelos/          # Modelos de Sequelize
│   ├── rutas/            # Rutas de la API
│   ├── validaciones/     # Middleware de validaciones
│   └── app.js            # Configuración principal
│
├── package.json          # Dependencias y scripts
└── README.md             # Documentación del repositorio
```

---

## ⚙️ Instalación

```bash
# Clona el repositorio
git clone https://github.com/cornlorn/servicio-loteria.git
cd servicio-loteria

# Instala las dependencias
npm install
```

---

## 🔧 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
PORT=3000
DB_NAME=nombre_bd
DB_USER=usuario_bd
DB_PASS=contrasena_bd
JWT_SECRET=secret_key
```

---

## 🧪 Ejecutar el servidor

Para ejecutar en modo desarrollo:

```bash
npm run dev
```

Para ejecutar en modo producción:

```bash
npm start
```

La API estará ejecutandose en [http://localhost:3000](http://localhost:3000)

---

## 🧠 Notas

- Archivo de entrada: `src/app.js`
- Puerto por defecto: **3000**
- Asegúrese que MySQL se esté ejecutando antes de iniciar el server

---

## 📄 Licencia

El proyecto es open-source y está disponible bajo la [Licencia MIT](LICENSE).
