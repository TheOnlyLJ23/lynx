/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public_html', 'index1.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('send media', function(data) {
    console.log('Post text: ' + data.caption);
    console.log('button clicked');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

