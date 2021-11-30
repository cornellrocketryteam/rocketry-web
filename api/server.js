const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '../client' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(3001, () => console.log('> Ready on http://localhost:3001'));
});
