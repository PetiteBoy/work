const fs = require('fs')
const express = require("express");
const app = express();
const port = 8080;
const util = require('./util/index');

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", true);
  req.method.toUpperCase() === "OPTIONS" ? res.sendStatus(200) : next();
});

app.post("/login", (req, res) => {
  let name = req.body.name;
  let id = util.randomWord(10)

  fs.readFile('./data/user.json', 'utf8', (err, data) => {
    let newData = JSON.parse(data);
    newData.push({ id, name })
    fs.writeFile('./data/user.json', JSON.stringify(newData), 'utf8', () => { })
  })
  let data = {
    code: 0,
    data: {
      id
    }
  }
  res.end(JSON.stringify(data))
});

var http = require('http');
var server = http.createServer(function (req, res) { }).listen(8888);
var io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
  console.log('链接成功');
  socket.on('compile', () => {
    socket.emit('login', 'ok');
  });
});

