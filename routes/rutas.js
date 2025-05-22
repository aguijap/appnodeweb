// routes/rutas.js

const fs = require('fs');
const path = require('path');
const os = require('os');

function logRequest(req) {
  const now = new Date().toISOString();
  const logLine = `[${now}] ${req.method} ${req.url}\n`;
  // Logging to console
  console.log(logLine.trim());
  // Logging to file
  const logDir = path.join(__dirname, '../log');
  const logFile = path.join(logDir, 'nodeweb.log');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  fs.appendFile(logFile, logLine, err => {
    if (err) console.error('Error escribiendo en el log:', err);
  });
}

function rutas(req, res) {
  logRequest(req);
  switch (req.url) {
    case '/ruta1': {
      const filePath = path.join(__dirname, 'ruta1.html');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error interno del servidor');
        } else {
          // Obtener el nombre del host y sistema operativo
          const hostname = os.hostname();
          const osType = os.type(); // 'Linux' para Ubuntu
          // Insertar la información en la página HTML
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
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ sw: "deff", qa: "sw" }));
      break;
    case '/ruta3':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Esta es la ruta 3');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
  }
}

module.exports = rutas;
