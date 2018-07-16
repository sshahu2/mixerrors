var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

let openSockets = new Set();
server.listen(3000,function(){
	console.log('started at 3000.');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/operator',(req,res)=>{
	res.sendFile(__dirname+'/static/operator.html');
})
app.get('/customer',(req,res)=>{
	res.sendFile(__dirname+'/static/customer.html');
})
io.on('connection', function (socket) {
  console.log('connected to socket: '+socket);
  openSockets.add(socket);
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});