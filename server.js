require('dotenv').config();

const Koa = require('koa');
const routes = require('./lib/routes');
const connectToDb = require('./lib/connect-to-db');
var http = require('http');

const app = new Koa();

connectToDb( {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

const PORT = process.env.PORT || 8080;

http.createServer(function (req, res) {
  var userpass = new Buffer((req.headers.authorization || '').split(' ')[1] || '', 'base64').toString();
  if (userpass !== 'username:password') {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="nope"' });
      res.end('HTTP Error 401 Unauthorized: Access is denied');
      return;
  }
  res.end('You are in! Yay!');
}).listen(1337, '127.0.0.1');

// Load the routes
app.use(routes());

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
