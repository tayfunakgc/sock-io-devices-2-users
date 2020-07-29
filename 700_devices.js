const io = require('socket.io-client');

const device700 = io('http://localhost:3000/devices', {
    extraHeaders: {
        id: 700,
        users: [2]
    }
});

device700.on('connect', () => console.log('700 connected'));
device700.on('disconnect', () => console.log('700 disconnected'));

setInterval(() => {
    if(device700.connected) {
        //console.log('connected');
        device700.emit('changed', true);
    } else {
        //console.log('not connected');
    }
}, 2000);