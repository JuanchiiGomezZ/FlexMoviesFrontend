# FLEX MOVIES

![Flex movies](./src/assets/readme/home.png)

## Descripción

Flex movies es una aplicación web que permite a los usuarios buscar información sobre películas y series. Utiliza la API de The Movie Database (TMDb) para obtener datos actualizados sobre películas, como detalles de la trama, calificaciones, reparto y más. Los usuarios pueden realizar búsquedas, ver detalles de películas y guardar sus películas favoritas.

## Capturas de pantalla

![Movies](./src/assets/readme/movies.png)
![Detail](./src/assets/readme/detail.png)

## Características

- Búsqueda de películas y series por título.
- Visualización de detalles de películas, como sinopsis, calificación, reparto, géneros, trailers, etc.
- Interfaz de usuario intuitiva y amigable.
- Ordenar las peliculas y series por Popularidad, Calificacion Fecha de lanzamiento y Titulo.
- Filtrar las peliculas y series por generos.
- Crear una cuenta e iniciar sesion.
- Guardado de películas favoritas.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- React.js
- Redux
- Axios
- React Router
- API de The Movie Database (TMDb)

## Instalación

1. Clona este repositorio en tu máquina local: `git clone https://github.com/JuanchiiGomezZ/FlexMoviesFrontend`

2. Ve al directorio del proyecto: `cd FlexMoviesFrontend`

3. Instala las dependencias: `npm install`

4. Renombrar el archivo env.template por .env y haz los cambios respectivos en las variables de entorno

```
VITE_API_KEY= Agrega tu clave de API de TMDb
VITE_API_URL= Agrega la url de tu base de datos
```

5. Inicia la aplicación `npm run dev`

## Base de datos de usuario

Backend desarrollado con NodeJS, MySQL y Express [Repositorio](https://github.com/JuanchiiGomezZ/FlexMoviesBackend)

Funcionalidades:

- POST sign up
- POST login
- GET user data
- GET user favs
- POST favorite
- DELETE favorite


## Derechos de autor

Proyecto creado por Mateo Bertello  
[Github](https://github.com/JuanchiiGomezZ)  
[Linkedin](https://www.linkedin.com/in/juan-manuel-gomez-omil/)

[API de The Movie Database (TMDb)](https://www.themoviedb.org/?language=es)
