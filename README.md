# 🌱 Proyecto de Invernadero Inteligente

Bienvenido al repositorio del proyecto de **Invernadero Inteligente**, una aplicación para el monitoreo y gestión de sensores internos y externos en un invernadero. Este sistema incluye un **backend** desarrollado en Node.js con conexión a SQL Server y MQTT, y un **frontend** diseñado con React para una interfaz de usuario moderna e intuitiva.

### Integrantes
- Cesar Antonio Roque Castro 00015319
- Eduardo Alessandro Rivera Diaz 00275220
- Jorge Eduardo Avalos Velasquez 00009322
---

## **Requisitos Previos**

### **General**
- **Git** instalado en el sistema.
- **Node.js** (versión 16 o superior).
- **NPM** o **Yarn** como administrador de paquetes.
- **SQL Server** configurado y en ejecución.
- **Broker MQTT** accesible para la comunicación con los sensores.

### **Backend**
- Archivo `.env` correctamente configurado para las variables de entorno necesarias.

### **Frontend**
- Navegador moderno (Google Chrome, Firefox, etc.).

## Dependencias del Proyecto

### Backend
- `express`
- `mssql`
- `mqtt`
- `dotenv`
- `axios`

Instaladas automáticamente con `npm install` en el backend.

### Frontend
- `react`
- `react-router-dom`
- `chart.js`
- `react-chartjs-2`
- `axios`

Instaladas automáticamente con `npm install` en el frontend.

---

## **Pasos para Configurar el Proyecto**

### **1. Clonar el Repositorio**

1. Abre la terminal y clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

---

### **2. Configuración del Backend**

1. Navega al directorio del backend:

   ```bash
   cd Backend
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en el directorio `Backend` con el siguiente contenido:

   ```env
   DB_USER=tu_usuario_sql_server
   DB_PASSWORD=tu_contraseña_sql_server
   DB_NAME=nombre_base_datos
   DB_HOST=localhost
   PORT=3000
   ```

   Asegúrate de que la base de datos SQL Server esté corriendo y configurada.

4. Crea y configura la base de datos en SQL Server ejecutando las migraciones necesarias. Asegúrate de que la tabla `sensor_data` esté creada:

   ```sql
    -- Crear la base de datos
    CREATE DATABASE sensores;
    
    -- Usar la base de datos
    USE sensores;
    
    -- Crear la tabla para almacenar datos de los sensores
    CREATE TABLE sensor_data (
        id INT PRIMARY KEY IDENTITY(1,1),         -- Identificador único
        type VARCHAR(20) NOT NULL,               -- Tipo: 'internal' o 'external'
        section VARCHAR(20) NULL,                -- Sección: 'section1', 'section2', etc.
        sensor VARCHAR(20) NOT NULL,             -- Tipo de sensor: 'temperature', 'humidity', etc.
        value FLOAT NOT NULL,                    -- Valor del sensor
        timestamp DATETIME DEFAULT GETDATE()     -- Marca de tiempo
    );
   ```

5. Inicia el servidor:

   ```bash
   node server.js
   ```

   El backend estará disponible en `http://localhost:3000`.

---

### **3. Configuración del Frontend**

1. Navega al directorio del frontend:

   ```bash
   cd ../Frontend
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador en:

   ```
   http://localhost:5173
   ```

---

## **Detalles de Configuración Adicional**

### **Configuración del Broker MQTT**

1. Asegúrate de que el broker MQTT esté funcionando y accesible.
2. Configura los detalles del broker en el archivo `App.jsx` en el frontend y en `mqttClient.js` en el backend.

   Ejemplo:

   **Frontend/App.jsx**
   ```javascript
   const brokerUrl = "ws://<IP_DEL_BROKER>:9001";
   const options = {
       username: "usuario_mqtt",
       password: "contraseña_mqtt",
   };
   ```

   **Backend/mqttClient.js**
   ```javascript
   const client = mqtt.connect('ws://<IP_DEL_BROKER>:9001', {
       username: 'usuario_mqtt',
       password: 'contraseña_mqtt',
   });
   ```

---

## **Problemas Comunes y Soluciones**

1. **Error al conectarse a la base de datos:**
   - Verifica los valores en el archivo `.env`.
   - Asegúrate de que SQL Server esté corriendo y accesible desde tu máquina.

2. **No aparecen gráficos en el dashboard:**
   - Asegúrate de que los datos estén llegando correctamente desde los sensores al broker MQTT.
   - Verifica las rutas del backend y las configuraciones de los sensores.

3. **Error al iniciar el frontend o backend:**
   - Verifica que todas las dependencias estén instaladas correctamente (`npm install`).
   - Asegúrate de que las versiones de Node.js y NPM sean compatibles.

---

## **Cómo Usar el Proyecto**

### **Interfaz Principal**
- **Dashboard:** Visualiza gráficos de los sensores internos y externos.
- **Monitoreo Interno:** Consulta la temperatura y humedad de las secciones internas.
- **Monitoreo Externo:** Consulta datos de luz, lluvia, humedad y temperatura externos.

