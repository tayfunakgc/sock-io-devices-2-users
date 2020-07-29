const io = require('socket.io-client');
const device600 = io('http://localhost:3000/devices', {
    extraHeaders: {
        id: 600,
        users: [1,2]
    }
});

device600.on('connect', () => console.log('600 connected'));
device600.on('disconnect', () => console.log('600 disconnected'));

setInterval(() => {
    if(device600.connected) {
        //console.log('connected');
        device600.emit('changed', true);
    } else {
        //console.log('not connected');
    }
}, 2000);