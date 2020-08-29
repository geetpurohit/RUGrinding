// Define modules
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);




// Express configuration
app.set('view engine', 'ejs');
app.use(express.static('public'));

//this is geet contributing 

let port = 3000;

// This is me contributing

// This is me contributing again
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log('Hello world!')
});