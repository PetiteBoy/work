var http = require('http');
var server = http.createServer(function (req, res) { }).listen(8888);
var io = require('socket.io').listen(server);


io.sockets.on('connection', (socket) => {
  console.log(1)


  socket.on('click', (mediaStream) => {
    console.log(mediaStream)
    io.emit('cb',mediaStream)
  });

  socket.on('disconnect', () => {
    console.log('断开链接');
  });
});




