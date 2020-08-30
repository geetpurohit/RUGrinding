const users = [];
const interviews = [];
// Join user to chat
function userJoin(id, firstname, room) {
    const user = { id, firstname, room }
    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

// User leaves room
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

function userJoinWait(id, firstname){
    const index = interviews.findIndex(user => user.room === 'wait-room');

    const user = {id, firstname, room: 'wait-room'};
    // No one waiting, add to waiting room
    if(interviews.length == 0){
        interviews.push(user);
        return user;
    }
    // someone already waiting, switch to users and return both users
    else{
        peer = interviews[index];
        interviews.splice(index, 1);
        users.push(user);
        users.push(peer);
        return {user, peer};
    }

}
// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    userJoinWait
}