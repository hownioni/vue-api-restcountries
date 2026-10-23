# 🌍 Explorador de Países

Aplicación web desarrollada con **Vue 3** que consume datos desde la **API REST Countries** y muestra información de países de forma dinámica.

## 🚀 Tecnologías

- **Vue 3** (Composition API + `<script setup>`)
- **Vite** como bundler
- **API REST Countries v5**
- **CSS Vanilla** con diseño moderno (dark mode, glassmorphism, animaciones)

## 📋 Características

- ✅ Consumo de API con `fetch()` dentro de `onMounted()`
- ✅ Variables reactivas con `ref()` y `computed()`
- ✅ Directiva `v-for` para listar países en tarjetas
- ✅ Directiva `v-if` para estados de carga, error y sin resultados
- ✅ Directiva `v-model` para filtrar por nombre y región
- ✅ Directiva `v-bind` para atributos dinámicos (banderas, alt text)
- ✅ Manejo de errores con `try / catch`
- ✅ Indicador de carga animado
- ✅ Diseño responsivo

## 🛠️ Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

## 🌐 Despliegue

El proyecto se publica automáticamente en **GitHub Pages** mediante GitHub Actions al hacer push a la rama `main`.

## 📡 API Utilizada

- **Endpoint**: `https://api.restcountries.com/countries/v5`
- **Documentación**: [REST Countries](https://restcountries.com)

## 📄 Estructura del Proyecto

```
src/
├── App.vue                    # Componente principal
├── main.js                    # Punto de entrada
├── style.css                  # Sistema de diseño global
└── components/
    ├── CountryCard.vue        # Tarjeta de país
    ├── SearchBar.vue          # Barra de búsqueda y filtros
    ├── LoadingSpinner.vue     # Indicador de carga
    └── ErrorMessage.vue       # Mensaje de error
```
