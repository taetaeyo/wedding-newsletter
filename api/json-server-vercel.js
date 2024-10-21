const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // db.json 파일에 JSON 데이터가 저장됨
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  server(req, res);
};