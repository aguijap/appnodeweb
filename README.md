# appwebnode

## Descripción

Esta aplicación es un servidor web básico desarrollado en Node.js utilizando solo módulos nativos. El servidor expone tres rutas principales y registra todas las peticiones tanto en consola como en un archivo de log. Es ideal como ejemplo de buenas prácticas para aplicaciones Node.js sencillas y como base para proyectos más avanzados.

## Funcionalidades

- **/ruta1**: Devuelve una página HTML (`ruta1.html`) que muestra el mensaje "hello world" e información sobre el nombre del host y el sistema operativo del servidor.
- **/ruta2**: Devuelve un objeto JSON con el contenido `{"sw":"deff", "qa":"sw"}`.
- **/ruta3**: Devuelve un mensaje de texto plano.
- **Registro de peticiones**: Todas las peticiones HTTP se registran en consola y en el archivo `./log/nodeweb.log`.

## Estructura del proyecto

- `index.js`: Punto de entrada principal del servidor.
- `routes/rutas.js`: Lógica de enrutamiento y manejo de peticiones.
- `routes/ruta1.html`: Página HTML servida en `/ruta1`.
- `log/nodeweb.log`: Archivo donde se almacenan los logs de acceso.
- `.gitignore`: Exclusiones recomendadas para Node.js.
- `package.json`: Metadatos y dependencias del proyecto.

## Cómo ejecutar

```sh
npm install   # Si tienes dependencias en package.json
node index.js
```

El servidor estará disponible en [http://localhost:3000](http://localhost:3000) por defecto.

## Despliegue recomendado

Para producción, se recomienda usar [PM2](https://pm2.keymetrics.io/) para gestionar el proceso:

```sh
npm install -g pm2
pm2 start index.js --name appwebnode
```

---
