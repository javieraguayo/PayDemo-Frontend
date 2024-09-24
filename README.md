
# PayDemo - Frontend

PayDemo-Frontend es la parte visual y de interacción con el usuario de una aplicación para la simulación de pagos. El frontend está construido con React, y se conecta a un backend para manejar la autenticación de usuarios y las transacciones.

## Requisitos previos
Antes de instalar y ejecutar este proyecto, asegúrate de tener lo siguiente instalado en tu máquina:

- Node.js (versión recomendada: 16.x o superior)
- npm 

## 1. Clona el repositorio
Primero, clona el repositorio de GitHub en tu máquina local:

```bash
git clone https://github.com/javieraguayo/PayDemo-Frontend.git
```

## 2. Navega al directorio del proyecto

```bash
cd PayDemo-Frontend
```

## 3. Instala las dependencias
Utiliza npm para instalar todas las dependencias necesarias:

```bash
npm install
```

## 4. Configuración de variables de entorno
Crea un archivo `.env` en la raíz del proyecto y define la URL del backend, que será utilizada para las solicitudes de autenticación y transacciones. El archivo debe tener el siguiente contenido:

```bash
REACT_APP_BACKEND_URL=http://localhost:4000
```

Asegúrate de que el backend esté configurado y corriendo en la URL que defines en el archivo `.env`.

## 5. Inicia la aplicación
Después de configurar todo, puedes iniciar la aplicación con:

```bash
npm start
```

Esto abrirá el frontend en tu navegador, normalmente en `http://localhost:3000`. Si no se abre automáticamente, puedes acceder manualmente ingresando esa URL en tu navegador.

## Uso

Una vez que la aplicación esté corriendo, puedes:

- Registrar nuevos usuarios.
- Iniciar sesión con usuarios registrados.
- Simular pagos y ver transacciones pasadas.

La aplicación se conecta a un backend para manejar las operaciones de autenticación y transacciones de pago.

## Estructura del proyecto
La estructura del proyecto sigue las mejores prácticas para aplicaciones React, organizada en componentes y servicios.

- `src/components/`: Contiene los componentes principales de la aplicación, como formularios de login y registro, y la interfaz de pagos.
- `src/services/`: Aquí se encuentran las funciones que interactúan con el backend para el registro, autenticación y procesamiento de pagos.
