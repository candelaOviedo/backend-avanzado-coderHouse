# Backend Ecommerce - CRUD de Usuarios con Autenticación y Autorización

Este proyecto es un backend para un ecommerce con un sistema de autenticación y autorización basado en JWT. Permite gestionar usuarios, con registro, login, protección de rutas, y la capacidad de actualizar datos del usuario.

## Requisitos

- Node.js (versión recomendada: v14.0.0 o superior)
- MongoDB (puede ser local o utilizar un servicio como MongoDB Atlas)

## Instalación

1. Insatalá las dependencias del proyecto 
```bas
npm install
```

## Variables de entorno

Para que el proyecto funcione correctamente, necesitas configurar las siguientes variables de entorno. Crea un archivo .env en la raíz de tu proyecto con los valores correspondientes.

### Variables:
- MONGO_URI=MONGO_URI=mongodb://localhost:27017/
- PORT=3000
- MONGO_URI=mongodb://localhost:27017/nombreDeLaDb
- JWT_SECRET=UnaClave



## 📚  Dependencias necesarias
Este proyecto usa las siguientes dependencias:

- express: Framework para construir el servidor.

- mongoose: ODM para conectarse a MongoDB.

- dotenv: Para manejar variables de entorno.

- bcryptjs: Para hashear y verificar contraseñas.

- jsonwebtoken: Para generar y validar tokens JWT.

- passport: Middleware de autenticación.

- passport-jwt: Estrategia de Passport para trabajar con JWT.

- cookie-parser: Para manejar cookies (extraer token de cookie).

- nodemon (desarrollo): Para reiniciar automáticamente el servidor al hacer cambios.

## 🚀 Scripts disponibles
npm run dev: Ejecuta el servidor en modo desarrollo usando Nodemon.

npm start: Ejecuta el servidor en modo producción (usando Node directamente).


## 🧪 Pruebas de rutas con Postman
📌 1. Registrar usuario
- Método: POST

- URL: http://localhost:8080/api/sessions/register

- Body (raw JSON):

``` json
{
  "first_name": "Nombre",
  "last_name": "Apellido",
  "email": "mail@example.com",
  "age": 30,
  "password": "123456"
}
```

✅ Respuesta esperada:

``` json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "_id": "id-del-usuario",
    "first_name": "Nombre",
    "last_name": "Apellido",
    "email": "mail@example.com",
    "age": 30,
    "role": "user",
  }
}
```


📌 2. Login usuario
- Método: POST

- URL: http://localhost:8080/api/sessions/login

- Body (raw JSON):


``` json
{
  "email": "mail@example.com",
  "password": "123456"
}

```

✅ Respuesta esperada:

```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```
📌 3. Obtener usuario actual (/current)
- Método: GET

- URL: http://localhost:8080/api/sessions/current

- Headers

- - Key: Authorization

- - Value: Bearer {token}



✅ Respuesta esperada:

```json
{
  "user": {
    "_id": "id-del-usuario",
    "first_name": "Nombre",
    "last_name": "Apellido",
    "email": "mail@example.com",
    "age": 30,
    "role": "user"
  }
}
```