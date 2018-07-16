
// Load third party dependencies
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Add middleware to serve static files from public directory (angular front end)
app.use(express.static(path.join(__dirname,'public')));

// Load our custom classes
const CustomerStore = require('./customerStore.js');
const MessageRouter = require('./messageRouter.js');


process.env.APIAI_ACCESS_TOKEN = '2a10c01d7530451ab54677754d935036';

// Load and instantiate the API.AI client library
const ApiAi = require('apiai');
const apiAiApp = ApiAi(process.env.APIAI_ACCESS_TOKEN);
// Instantiate our app
const customerStore = new CustomerStore();
const messageRouter = new MessageRouter(customerStore, apiAiApp, io.of('/customer'), io.of('/operator'));

// Serve static html files for the customer and operator clients
app.get('/customer', (req, res) => {
  res.sendFile(`${__dirname}/static/customer.html`);
});

app.get('/operator', (req, res) => {
  res.sendFile(`${__dirname}/static/operator.html`);
});

const login = (req,res)=>{
	res.json({success:true});
}
app.route('/login')
	.get(login)
	.post(login);

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'public','index.html'));
})

// Begin responding to websocket and http requests
messageRouter.handleConnections();
http.listen(3000, () => {
  console.log('Listening on *:3000');
});
