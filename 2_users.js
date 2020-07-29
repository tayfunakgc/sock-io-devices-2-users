const io = require('socket.io-client');

const user2 = io('http://localhost:3000/users', {
    extraHeaders : {
        id:'2',
        devices: [700, 600]
    }
})

user2.on('connect', () => console.log('user2 connected.'));
user2.on('disconnect', () => console.log('user2 disconnected.'));
user2.on('device-change', (data) => {
    console.log('user2 dev changed id: ', data);
});