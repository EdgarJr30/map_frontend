
# Prueba – Aplicación de Biblioteca

Este proyecto es una aplicación de biblioteca construida con un backend en .NET Web API Core y un frontend en React con TypeScript. Utiliza una base de datos MySQL para almacenar los datos.

## Requisitos previos

Antes de descargar y ejecutar el proyecto, asegúrate de tener instalados los siguientes componentes en tu máquina:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/en/) (versión 14 o superior)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Git](https://git-scm.com/)

## Pasos para configurar y ejecutar el proyecto

### 1. Clonar el repositorio

Clona el repositorio del proyecto desde GitHub:

```bash
git clone https://github.com/EdgarJr30/map_frontend
cd  map_frontend

git clone https://github.com/EdgarJr30/map_backend
cd  map_backend
```

### 2. Configuración de la base de datos

1. Abre MySQL y crea una nueva base de datos con el nombre `db_map_library`.
   
2. Importa el archivo `db_map_library.sql` que se incluye en el repositorio para crear las tablas y relaciones necesarias:

```sql
SOURCE src/api/db_map_libraryy.sql;
```

Asegúrate de tener configurado un usuario de MySQL con permisos para acceder y modificar la base de datos.

### 3. Configuración del backend

1. Ve al Repositorio del backend:

```bash
git https://github.com/EdgarJr30/map_backend
cd  map_backend
```

2. Restaura los paquetes NuGet necesarios:

```bash
dotnet restore
```

3. Configura la cadena de conexión en el archivo `appsettings.json` con los detalles de tu base de datos MySQL:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=db_map_libraryy;User Id=tu_usuario;Password=tu_contraseña;"
}
```

4. Ejecuta la aplicación backend:

```bash
dotnet run
```

### 4. Configuración del frontend

1. Ve al directorio del frontend:

```bash
cd map_frontend
```

2. Instala las dependencias de npm:

```bash
npm install
```

3. Inicia la aplicación frontend:

```bash
npm run dev
```

### 5. Acceso a la aplicación

Una vez que ambos servidores (backend y frontend) estén corriendo:

- El backend estará disponible en: `http://localhost:5000` o el puerto que definas.
- El frontend estará disponible en: `http://localhost:3000`. o el puerto que definas

### 6. Notas adicionales

- Recuerda que para realizar las operaciones protegidas por JWT (crear, actualizar libros), debes tener una cuenta válida y autenticación correcta.
- Cualquier duda o consulta sobre el proyecto, puedes abrir un issue en el repositorio o contactarme.

### 6. Cuentas de administrador y bibliotecario

admin@admin.com
123456

bibliotecario@bibliotecario.com
123456
