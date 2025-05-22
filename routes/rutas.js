// routes/rutas.js

const fs = require('fs');
const path = require('path');
const os = require('os');
const winston = require('winston');

// Configuración de winston para registrar en archivo y consola
const logDir = path.join(__dirname, '../log');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'verbose',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'nodeweb.log') }),
    new winston.transports.Console()
  ]
});

/**
 * Registra cada petición HTTP usando winston.
 * @param {http.IncomingMessage} req - Objeto de la petición HTTP.
 */
function logRequest(req) {
  logger.info(`${req.method} ${req.url}`);
}

/**
 * Función principal de enrutamiento para las rutas del servidor.
 * Atiende /ruta1, /ruta2, /ruta3 y responde 404 para otras rutas.
 * @param {http.IncomingMessage} req - Objeto de la petición HTTP.
 * @param {http.ServerResponse} res - Objeto de la respuesta HTTP.
 */
function rutas(req, res) {
  logRequest(req); // Registrar cada petición
  switch (req.url) {
    case '/ruta1': {
      // Leer y servir el archivo HTML, insertando información del servidor
      const filePath = path.join(__dirname, 'ruta1.html');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          logger.error(`Error leyendo ruta1.html: ${err.message}`);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error interno del servidor');
        } else {
          // Obtener información del host y sistema operativo
          const hostname = os.hostname();
          const osType = os.type(); // 'Linux' para Ubuntu
          // Insertar la información antes de </body>
          const infoHtml = `<p>Servidor: <strong>${hostname}</strong> (${osType})</p>`;
          const page = data.replace(
            '</body>',
            `${infoHtml}\n</body>`
          );
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(page);
        }
      });
      break;
    }
    case '/ruta2':
      // Responder con un JSON fijo
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ sw: "deff", qa: "sw" }));
      break;
    case '/ruta3':
      // Responder con texto plano
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Esta es la ruta 3');
      break;
    default:
      // Responder 404 para rutas no definidas
      logger.warn(`Ruta no encontrada: ${req.url}`);
      if (!res.headersSent) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
      }
      res.end('Ruta no encontrada');
  }
}

// Exportar la función de rutas para usarla en index.js
module.exports =  rutas ;
