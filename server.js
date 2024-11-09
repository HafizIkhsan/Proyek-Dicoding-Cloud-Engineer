const http = require('http');
const fs = require('fs');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');

  let filePath;

  // Tentukan file berdasarkan URL
  if (request.url === '/') {
    filePath = './pages/index.html';
    response.setHeader('Content-Type', 'text/html');
  } else if (request.url === '/style/style.css') {
    filePath = './style/style.css';
    response.setHeader('Content-Type', 'text/css');
  } else {
    response.statusCode = 404;
    response.end('404 Not Found');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.statusCode = 500;
      response.end('<h1>Server Error</h1>');
    } else {
      response.statusCode = 200;
      response.end(data);
    }
  });
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
