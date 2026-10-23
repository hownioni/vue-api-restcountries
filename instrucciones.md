# 📌 Segundo proyecto Unidad 3 – Consumo de API con Vue 3

# 🎯 Objetivo

Desarrollar una aplicación web con Vue 3 que consuma datos desde la API REST Countries y muestre información de forma dinámica utilizando:

- Peticiones asíncronas con fetch()
- Estructuras de control (v-if, v-for)
- Enlace de datos (v-model, v-bind)

El proyecto debe publicarse en GitHub Pages desde un repositorio personal.

# 📋 Requisitos del Proyecto

## Repositorio en GitHub

Crear un repositorio personal en GitHub con el nombre sugerido:

`vue-api-restcountries`

El repositorio debe incluir:

- Todo el código fuente del proyecto Vue (src, components, etc.)
- Commits durante el desarrollo del proyecto

## Publicación en GitHub Pages

El proyecto debe publicarse usando GitHub Pages.

⚠️ Tengan cuidado, se piden dos enlaces uno del repositorio con el proyecto VUE y otro del sitio publicado.
3️⃣

## Consumo de API

La aplicación debe consumir datos desde la siguiente API:
🔗https://api.restcountries.com/countries/v5?q=Canada&api-key=rc_live_demo&pretty=1"

Las peticiones deben realizarse utilizando:

`fetch()`

La primer llamada debe ejecutarse dentro de:

`onMounted()`

Los datos obtenidos deben guardarse en una variable reactiva usando:

`ref() o reactive()`

## Uso de Estructuras de Vue

La aplicación debe demostrar el uso de las siguientes estructuras:

### 🧩 v-for

Mostrar una lista de países obtenidos desde la API.

Ejemplo de datos mostrados:

- Nombre del país
- Bandera
- Capital
- Región
- Población

### 🧩 v-if

Mostrar elementos dependiendo del estado de la aplicación, por ejemplo:

- Indicador de carga mientras se obtienen los datos.
- Mensaje si no hay resultados.

### ⚙️ v-model

Permitir filtrar países mediante un campo de búsqueda.

Ejemplo:

`<input v-model="filtro">`

El filtro puede aplicarse por:

- Nombre del país
- Región

## Interfaz mínima requerida

La interfaz debe incluir al menos:

### 🟢 Título del proyecto

Ejemplo:

`Explorador de Países`

### 🔎 Campo de búsqueda

Permitir filtrar países por nombre.

Ejemplo:

`<input v-model="busqueda">`

### 🌍 Lista o tarjetas de países

Cada país debe mostrar al menos:

- Bandera
- Nombre
- Capital
- Región
- Población

### ⏳ Indicador de carga

Mostrar un mensaje mientras se cargan los datos.

Ejemplo:

`Cargando países...`

## Manejo opcional de errores

Opcionalmente, pueden usar:

`try / catch`

Para mostrar un mensaje si la API falla.

Ejemplo:

`No fue posible obtener los datos de la API`

## 📝 7️⃣ Documento PDF de Evidencias de Cumplimiento

El PDF debe demostrar cada especificación solicitada.

Cada evidencia debe incluir:

### Título

Indicar qué especificación se cumple.

Ejemplo:

`Consumo de API usando fetch()`

### Captura de la interfaz

Una o más capturas de pantalla.

⚠️ Solo una captura por página.

### Captura del código fuente

Mostrar el código donde se demuestra la funcionalidad.

⚠️ Solo una captura por página.

### Explicación breve

Máximo dos párrafos explicando qué se hizo.

## 📤 8️⃣ Entrega

El estudiante debe enviar:

🔗 Link del repositorio GitHub (código fuente)

🌐 Link del sitio publicado en GitHub Pages

📄 Archivo PDF con evidencias

### ✅ 9️⃣ Lista de requistos

Antes de entregar, verificar que el proyecto cumple con lo siguiente:

- [ ] Dirección del repositorio en GitHub con el código fuente Vue.
- [ ] Dirección del sitio publicado en GitHub Pages.
- [ ] Uso de fetch() para consumir la API REST Countries.
- [ ] Uso de onMounted() para obtener los datos.
- [ ] Uso de v-for.
- [ ] Uso de v-if para mostrar estados de la aplicación.
- [ ] Uso de v-model para filtrar información.
- [ ] Indicador de carga mientras se obtienen datos.
