const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const header = document.getElementById('header');

const socket = io();

// Get first name from URL
const firstname = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Join wait-room
socket.emit('joinWaitRoom', firstname.firstname);

socket.on('wakeup', (name) => {
    changeHeader(name);
});

socket.on('type_error', () => {
    header.innerHTML = 'Must wait for a person to connect to start typing!';
});


function changeHeader(firstname){
    header.innerHTML = `${firstname} connected!`;
}


// Geet's
// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
  });
  
  // Message from server
  socket.on('message', message => {
    console.log(message);
    outputMessage(message);
  
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  
  // Message submit
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
  
    // Get message text
    const msg = e.target.elements.msg.value;
  
    // Emit message to server
    socket.emit('chatMessage', msg);
  
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });
  
  // Output message to DOM
  function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.firstname} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
  }
  
  // Add room name to DOM
  function outputRoomName(room) {
    roomName.innerText = room;
  }
  
  // Add users to DOM
  function outputUsers(users) {
    userList.innerHTML = `
      ${users.map(user => `<li>${user.firstname}</li>`).join('')}
    `;
  }
