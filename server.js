// Define modules
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);




// Express configuration
app.set('view engine', 'ejs');
app.use(express.static('public'));


let port = 3000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log('Hello world!')
})