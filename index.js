const http = require('http');
const { rutas } = require('./routes');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  rutas(req, res);
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
