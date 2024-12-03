const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuración del servidor
const hostname = '0.0.0.0'; // Permitir acceso desde otros dispositivos
const port = 8080;

// Mapear extensiones de archivo a sus tipos MIME
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
};

// Crear servidor HTTP
const server = http.createServer((req, res) => {
    let filePath = './public' + req.url; // Servir archivos desde la carpeta 'public'

    if (filePath === './public/') {
        filePath = './public/comida.html'; // Cargar la página principal
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404: Página no encontrada</h1>', 'utf-8');
            } else {
                // Error del servidor
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Error del servidor: ${error.code}`, 'utf-8');
            }
        } else {
            // Archivo encontrado, enviar contenido
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Iniciar servidor
server.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
