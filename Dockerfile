FROM node:slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto que usa tu app (ajusta si usas otro)
EXPOSE 3000

# Comando para iniciar tu app
CMD ["node", "index.js"]
