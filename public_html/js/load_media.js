/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

var users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public_html', 'index1.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);
  var user = socket.id;
  users.push(user);
  console.log("List of users: " + users.join());
  socket.on('disconnect', () => {
    var i = users.length;
    while(i--) {
        if(users[i] === socket.id) {         
            users.splice(i, 1);
        }
    }
  });
  socket.on('send media', function(data) {
    console.log('Image: ' + data.image);
    console.log('Post text: ' + data.caption);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

