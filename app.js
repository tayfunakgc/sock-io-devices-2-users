const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

const users = io.of('/users');

const userSock = {};
const sockUser = {};

users.on('connection', (socket) => {
    const SocketID = socket.id;
    const UserID = socket.handshake.headers.id;
    
    userSock[UserID] = SocketID;
    sockUser[SocketID] = UserID;
    
    console.log(userSock);
    console.log('------');
    console.log(sockUser);
    
    socket.on('disconnect', () => {
        const SocketID = socket.id;
        const UserID = sockUser[SocketID];
        delete userSock[UserID];
        delete sockUser[SocketID];
        /*
        console.log(userSock);
        console.log('------');
        console.log(sockUser);
        */
    });
});

const devices = io.of('/devices');

const deviceSock = {}; //* 
const sockDevice = {}; //* socket.id: 600

devices.on('connection', (socket) => {
    const SocketID = socket.id;
    const DeviceID = socket.handshake.headers.id
    const DeviceUsers = (socket.handshake.headers.users).split(',');
    //console.log(DeviceID);
    //console.log(DeviceUsers);
    deviceSock[DeviceID] = {
        socket_id: SocketID,
        users: DeviceUsers
    }
    sockDevice[SocketID] = DeviceID;

    socket.on('changed', (data) => {
        const SocketID = socket.id;
        const DeviceID = sockDevice[SocketID];
        console.log('CHANGED: ', DeviceID);
        const devUsers = deviceSock[DeviceID].users;
        console.log('USERS: ', devUsers);
        
        for(user in devUsers) {
            const UserID = devUsers[user].trim();
            console.log('USER ID: ', UserID);
            //console.log('USERSOCK KEYS: ', Object.keys(userSock));
            //console.log(userSock[UserID]);
            if(Object.keys(userSock).includes(UserID)) {
                //console.log('user online: ', users[user], '-' ,DeviceID);
                //console.log('Emit to: ', UserID);
                users.to(userSock[UserID]).emit('device-change', DeviceID);
            } else {
                //console.log('DONT: ', UserID);
                //console.log('user offline: ', users[user], '-', DeviceID);
            }
        }
        
    });

    /*
    console.log(deviceSock);
    console.log('------');
    console.log(sockDevice);
    */
    socket.on('disconnect', () => {
        const SocketID = socket.id;
        const DeviceID = sockDevice[SocketID];
        delete sockDevice[SocketID];
        delete deviceSock[DeviceID];
        /*
        console.log(deviceSock);
        console.log('------');
        console.log(sockDevice);
        */
    });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});