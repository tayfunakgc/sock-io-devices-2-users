const io = require('socket.io-client');
const user1 = io('http://localhost:3000/users', {
    extraHeaders : {
        id:'1',
        devices: [600]
    }
})

user1.on('connect', () => console.log('user1 connected.'));
user1.on('disconnect', () => console.log('user1 disconnected.'));
user1.on('device-change', (data) => {
    console.log('user1 dev changed id: ', data);
});