const util = require('./util/index')
const fs = require('fs');
var http = require('http');
var server = http.createServer(function (req, res) { }).listen(8888);
var io = require('socket.io').listen(server);
let isLineList = []

io.sockets.on('connection', (socket) => {

  socket.on('login', ({ name }) => {
    let id = util.randomWord(20);

    fs.readFile('./data/user.json', 'utf8', (err, data) => {
      let newData = JSON.parse(data);

      let isHas = newData.some(item => {
        return String(name) === String(item.name)
      })
      if (isHas) {
        socket.emit('is exist');
      } else {
        newData.push({ id, name });
        socket.emit('is online');
        isLineList = [];
        fs.writeFile('./data/user.json', JSON.stringify(newData), 'utf8', () => { })
        socket.emit('login ok', name);
      }
    });
  });

  socket.on('chat msg', ({ name, msg }) => {
    fs.readFile('./data/list.json', 'utf8', (err, data) => {
      let newList = JSON.parse(data);
      let time = new Date().getTime();

      socket.emit('chat msg', { name, msg });

      newList.push({ name, msg, time });
      fs.writeFile('./data/list.json', JSON.stringify(newList), 'utf8', () => { })
    });
  })

  socket.on('is online', (name) => {
    isLineList.push(name)
    socket.emit('user list', isLineList);
  })

  socket.on('chat list', () => {
    fs.readFile('./data/list.json', 'utf8', (err, data) => {
      let newList = JSON.parse(data);

      newList = newList.map((item) => {
        let { msg, name } = item

        return { msg, name }
      })

      socket.emit('chat list', newList);
    });
  })

  socket.on('disconnect', () => {
    console.log('断开链接');
  });
});




