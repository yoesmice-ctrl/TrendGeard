# TrendGeard
TrendGeard.

📊 TrendGear Dashboard.

Dashboard web interactivo para la visualización, análisis y gestión de información de clientes y ventas.

El proyecto permite consultar datos almacenados en Firebase, mostrar estadísticas importantes del negocio y representar información mediante gráficos dinámicos.


🚀 Características Principales.

✅ Dashboard administrativo interactivo  
✅ Visualización de clientes registrados  
✅ Búsqueda dinámica por nombre, ciudad o producto  
✅ Tabla de clientes con ordenamiento  
✅ Cálculo automático de ventas totales  
✅ Conteo de miembros Gold  
✅ Estadísticas de comportamiento de clientes  
✅ Gráficas dinámicas con Chart.js  
✅ Exportación de datos en formato CSV  
✅ Modo oscuro  
✅ Navegación por módulos  


🖥️ Módulos del Sistema.

🏠 Inicio.

Panel principal donde se visualizan:

- Total de clientes
- Ventas acumuladas
- Cantidad de clientes Gold
- Gráfica de clientes por membresía
- Gráfica de ventas por ciudad
- Estadísticas generales


👥 Clientes.

Permite:

- Visualizar clientes registrados
- Buscar clientes por:
  - Nombre
  - Ciudad
  - Producto adquirido

- Ordenar información por:
  - Nombre
  - Ciudad
  - Producto
  - Valor de compra
  - Membresía


📈 Reportes.

Módulo encargado de mostrar análisis visual mediante:

- Gráficas de distribución de clientes
- Análisis de ventas por ciudad
- Información estadística del negocio



⚙️ Configuración.

Espacio destinado para futuras configuraciones del sistema.



📄 Exportación.

Permite descargar la información de clientes en formato:

```
CSV
```

Incluyendo:

- Nombre
- Ciudad
- Producto
- Valor comprado
- Membresía


🛠️ Tecnologías Utilizadas.

Frontend

- HTML5.
- CSS3.
- JavaScript ES6.


Librerías.

- Chart.js.
- Font Awesome.


Base de Datos.

- Firebase Realtime Database.


📂 Estructura del Proyecto.

```
TrendGear/
│
├── index.html
│
├── style.css
│
├── app.js
│
├── firebase.js
│
└── README.md
```


🔥 Funcionamiento.

El sistema realiza una consulta a Firebase para obtener los clientes registrados.

Los datos obtenidos son procesados mediante JavaScript para:

- Crear tablas dinámicas.
- Calcular estadísticas.
- Generar gráficos.
- Filtrar información.
- Exportar datos.


📊 Ejemplo de datos manejados.

Cada cliente contiene información como:

```json
{
"name": "Cliente ejemplo",
"city": "Bogotá",
"productPurchased": "Laptop",
"amountSpent": 2500000,
"membershipStatus": "Gold"
}
```


⚙️ Instalación y Ejecución.

1. Descargar o clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```


2. Abrir el proyecto en Visual Studio Code.


3. Ejecutar con Live Server.


4. Verificar conexión con Firebase.


---

# 👨‍💻 Autor

**Yojhan Vega**

Proyecto desarrollado como práctica de desarrollo web y análisis de datos.


---

# 📌 Próximas mejoras

- Sistema de autenticación de usuarios
- Roles administrativos
- Más módulos de reportes
- Diseño responsive avanzado
- Panel con más indicadores empresariales

---

⭐ Proyecto TrendGear Dashboard - 2026.
