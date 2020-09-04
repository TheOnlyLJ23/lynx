/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var cors = require('cors');

var users = [];
var images = [];
var videos = [];
var posts = [];

var domains = ["http://localhost:8383/ricky_website/index.html", 
    "http://localhost:8383/ricky_website/index.html#home",
    "http://localhost:8383/ricky_website/index.html#photogallery",
    "http://localhost:8383/ricky_website/index.html#videos"
    ];
    
var corsOptions = {
  origin: function (origin, callback) {
    if (domains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors({
    origin: "http://localhost:8383"
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public_html', 'index1.html'));
});

app.get('/images', cors(), (req, res) => {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    
    res.on('error', (err) => {
        console.error(err);
    });
    
    var new_data;
    if(images.length > 0) {
        new_data = images[0];
    } else {
        new_data = "No new images for you atm, sorry";
    }
    res.statusCode = 200;
    res.send(JSON.stringify(new_data));
    res.end();
    
    images.splice(0, 1);
});

app.get('/videos', cors(), (req, res) => {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    
    res.on('error', (err) => {
        console.error(err);
    });
    
    var new_data;
    if(videos.length > 0) {
        new_data = videos[0];
    } else {
        new_data = "No new videos for you atm, sorry";
    }
    res.statusCode = 200;
    res.send(JSON.stringify(new_data));
    res.end();
    
    videos.splice(0, 1);
});

app.get('/posts', cors(), (req, res) => {
    req.on('error', (err) => {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });
    
    res.on('error', (err) => {
        console.error(err);
    });
    
    var new_data;
    if(posts.length > 0) {
        new_data = posts[0];
    } else {
        new_data = "No new posts for you atm, sorry";
    }
    res.statusCode = 200;
    res.send(JSON.stringify(new_data));
    res.end();
    
    posts.splice(0, 1);
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
  socket.on('send post', function(data) {
    var res = JSON.parse(data);
    switch (res.file) {
        
        case "image":
            images.push(res);
            break;
        case "video":
            videos.push(res);
            break;
    }
    
    
    posts.push(res);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

