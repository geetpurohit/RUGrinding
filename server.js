// Define modules
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const id = require('uuid');

// Local modules
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers, userJoinWait  } = require('./utils/users');


// Express configuration
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// Socket.io configuration 
const botName = 'ChatCord Bot';
// Client listener
io.on('connection', socket => {
    socket.on('joinWaitRoom', (firstname) => {
        const user = userJoinWait(socket.id, firstname);
        // If user is two users, socket.join() both of them to a unique room
        if(Object.keys(user).length == 2){
            uuid = id.v4();
            // Connect to same room
            socket.join(uuid);
            io.sockets.connected[user['peer'].id].join(uuid);
            
            // Change their room ids for users[] 
            // send welcome messages

            p1_name = user['user'].firstname;
            p2_name = user['peer'].firstname;

            user['user'].room = uuid;
            user['peer'].room = uuid;

            socket.emit('wakeup', p2_name);
            io.sockets.connected[user['peer'].id].emit('wakeup', p1_name);
        }
       
    });
    

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.firstname, msg));
    });
    
  
    // Runs when client disconnects; send to all users connected
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
        
    });

})


server.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${port}`);
    console.log('Hello world!')
});