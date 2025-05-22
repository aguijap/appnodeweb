#!/bin/bash

# Construir la imagen Docker con el nombre 'miapp'
docker build -t miapp .

# Eliminar el contenedor anterior si existe
docker rm -f miappcont 2>/dev/null

# Ejecutar el contenedor llamado 'miappcont' en segundo plano, mapeando el puerto 3000
docker run -d --name miappcont -p 3000:3000 miapp

echo "La aplicación está disponible en http://localhost:3000"