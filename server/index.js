import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import config from './config';
import helmet from 'helmet';

//const rateLimit = require("express-rate-limit");
//use fs for https
//const fs = require('fs-extra');
const express = require('express');
const app = require('express')();
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ));
// use ws: for http and wss: for https
// on remote site using https: 'connect-src': ["'self'", 'wss:'], 
// on local site using http: 'connect-src': ["'self'", 'ws://localhost:3000'], 
app.use(helmet({
	contentSecurityPolicy: {
        //develop styles with reportOnly true, then
        //insert style hashes from devtools as required
		//reportOnly: true,
		useDefaults: true,
		directives: {
      'default-src': ["'self'", "http://localhost/bundle.js"],
      'connect-src': ["'self'", 'ws://localhost:3000'],
      'style-src': ["'self'", "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='", "'sha256-ctEl8OuKHkM3T5T7zX550onT352rVeYibxCWZgGZKOc='", "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='", "'sha256-hu0m/b5xLIfdwdth8xFaJEXxTP03HhyPNySTmdpqWPE='"],
      'script-src-attr': ["null"],
      'script-src': ["'self'"],
      'img-src': ["'self'", "http://localhost/fonts/", "http://localhost/img/userPhotos", "http://localhost/favicon.ico"],
      'font-src': ["'self'", "http://localhost/fonts/"],
      'frame-ancestors': ["'self'"],
		},
	},
}));
// For express-rate-limit:   ------------
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
/*  ************  Rate limiter **************
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
//  apply to all requests
// app.use(limiter); // RESTORE LIMITER HERE
// end of express-rate-limit -----------
*/
const server = require('http').createServer(app);
/* *********** Switch to this to use https *********** 
const server = require('https').createServer({
    key: fs.readFileSync(config.keyfile),
    ca: fs.readFileSync(config.cafile),
    cert: fs.readFileSync(config.certfile),
    requestCert: false,
    rejectUnauthorized: false	
},app);
*/
/* */
const	io = require('socket.io')(server, {
  cors: {    
		//change this to the registered domain
		origin: "http://localhost",    
		methods: ["GET", "POST"]
	}
});
const port = config.port;
io.on("connection", socket => {
   socket.on("incoming data", (data) => {
     socket.broadcast.emit("outgoing data", {num: data});
   });
 });
server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());


const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {

// ---- socket.io connection test ----
// (2): The server recieves a ping event
// from the browser on this socket
// socket.on('how are you', function ( data ) {
//   console.log('socket: server receives how are you (2)');
  // (3): Emit a response event to all listeners
  // with the data from the 'how are you' event
// io.sockets.emit( 'fine', data );   
// console.log('socket: server sends fine to all (3)');
// });
// -------------------------------------
  socket.on('addItem', (data) => {
		socket.broadcast.emit('addItem', data);
	});
	socket.on('clear', () => {
		socket.broadcast.emit('clear');
	});
	socket.on('undo', () => {
		socket.broadcast.emit('undo');
	});
	socket.on('redo', () => {
		socket.broadcast.emit('redo');
	});
});

