// routes/rutas.js

const fs = require('fs');      // Módulo para operaciones de sistema de archivos
const path = require('path');  // Módulo para manejar rutas de archivos
const os = require('os');      // Módulo para obtener información del sistema operativo

/**
 * Registra cada petición HTTP en consola y en un archivo de log.
 * @param {http.IncomingMessage} req - Objeto de la petición HTTP.
 */
function logRequest(req) {
  const now = new Date().toISOString();
  const logLine = `[${now}] ${req.method} ${req.url}\n`;
  // Mostrar en consola
  console.log(logLine.trim());
  // Guardar en archivo de log
  const logDir = path.join(__dirname, '../log');
  const logFile = path.join(logDir, 'nodeweb.log');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  fs.appendFile(logFile, logLine, err => {
    if (err) console.error('Error escribiendo en el log:', err);
  });
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
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
  }
}

// Exportar la función de rutas para usarla en index.js
module.exports = rutas;
