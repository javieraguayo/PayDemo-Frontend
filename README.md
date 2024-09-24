
# PayDemo - Frontend

**PayDemo-Frontend** es la interfaz visual de una aplicación que permite la simulación de pagos. Esta aplicación está construida con **React** y se conecta a un backend que maneja la autenticación de usuarios y las transacciones de pago.

## Requisitos previos

Antes de instalar y ejecutar este proyecto, asegúrate de tener los siguientes requisitos instalados en tu máquina:

- **Node.js** (versión recomendada: 16.x o superior)
- **npm** (administrador de paquetes de Node.js)

## Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio desde GitHub a tu máquina local:

```bash
git clone https://github.com/javieraguayo/PayDemo-Frontend.git
```

### 2. Navegar al directorio del proyecto

Ingresa al directorio del proyecto:

```bash
cd PayDemo-Frontend
```

### 3. Instalar las dependencias

Instala todas las dependencias del proyecto usando npm:

```bash
npm install
```

### 4. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y define la URL del backend que será usada para la autenticación y transacciones. El archivo debe tener el siguiente contenido:

```bash
REACT_APP_BACKEND_URL=http://localhost:4000
```

Asegúrate de que el backend esté configurado y corriendo en la URL que defines en el archivo `.env`.

### 5. Iniciar la aplicación

Después de configurar todo, inicia la aplicación con:

```bash
npm start
```

Esto abrirá el frontend en tu navegador en `http://localhost:3000`. Si no se abre automáticamente, accede manualmente ingresando esa URL en tu navegador.

## Uso

Una vez que la aplicación esté corriendo, puedes realizar las siguientes acciones:

- **Registrar nuevos usuarios**.
- **Iniciar sesión** con usuarios registrados.
- **Simular pagos** y visualizar transacciones pasadas.

La aplicación se conecta a un backend para manejar las operaciones de autenticación y transacciones de pago.

## Estructura del proyecto

La estructura del proyecto sigue las mejores prácticas para aplicaciones React, organizadas en componentes y servicios:

```
/PayDemo-Frontend
│
├── /public                    # Archivos públicos y estáticos
│   └── index.html             # Archivo HTML base
│
├── /src                       # Código fuente de la aplicación
│   ├── /assets                # Imágenes y otros recursos estáticos
│   ├── /components            # Componentes React reutilizables
│   │   ├── Dashboard.js       # Panel de control
│   │   ├── LoginForm.js       # Formulario de inicio de sesión
│   │   ├── NavigationBar.js   # Barra de navegación
│   │   ├── PaymentForm.js     # Formulario de pago
│   │   ├── ProtectedRoute.js  # Rutas protegidas para usuarios autenticados
│   │   ├── Receipt.js         # Comprobante de pago
│   │   ├── RegisterForm.js    # Formulario de registro de usuarios
│   │   └── TransactionHistory.js # Historial de transacciones
│   │
│   ├── /context               # Contextos globales de la aplicación
│   │   └── AuthContext.js     # Contexto de autenticación de usuarios
│   │
│   ├── /pages                 # Páginas principales de la aplicación
│   │   ├── FailurePage.js     # Página de fallo de transacción
│   │   ├── ErrorPage.js       # Página de error
│   │   ├── HistoryPage.js     # Página del historial de transacciones
│   │   ├── HomePage.js        # Página de inicio
│   │   ├── PaymentPage.js     # Página de pago
│   │   └── SuccessPage.js     # Página de éxito de transacción
│   │
│   ├── /services              # Servicios de interacción con el backend
│   │   ├── authService.js     # Manejo de autenticación (registro, inicio de sesión)
│   │   ├── paymentService.js  # Servicio de procesamiento de pagos
│   │   └── transactionService.js # Servicio para manejar el historial de transacciones
│   │
│   ├── /utils                 # Utilidades y funciones auxiliares
│   │   └── validation.js      # Validaciones y utilidades varias
│   │
│   ├── App.js                 # Componente principal de la aplicación
│   ├── index.js               # Punto de entrada de React
│   └── index.css              # Estilos globales de la aplicación
│
├── .env                       # Variables de entorno para la configuración
├── .gitignore                 # Archivos a ignorar en el control de versiones Git
├── package.json               # Información del proyecto y dependencias npm
├── README.md                  # Documentación del proyecto
```
