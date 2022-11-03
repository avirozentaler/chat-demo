require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);

const cors = require('cors')



const { Server } = require('socket.io')
const router = require('./routers');
const PORT = process.env.PORT;
const users = require('./db/users');
const messages = require('./db/messages');
const io = new Server(server, { cookie: true, cors: { origin: ["http://localhost:3000"] } });


app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));


app.use(router);



io.use((socket, next) => {
    const auth = socket.handshake.auth;
    console.log(auth);                           //////////////
    const userIdExist = auth.hasOwnProperty("userId")
    console.log(userIdExist);                     /////////////////

    if (!auth.userName) {
        console.log('err');                     ////////////////
        return next(new Error("invalid username"));
    }
    if (!userIdExist) {
        console.log('not exist');                   /////////////////

        console.log(users);
        users.push(
            {
                userName: auth.userName,
                userId: socket.id,

            })

    }
    else {
        console.log('exist');                         ////////////////////
        console.log(users);
        socket.id = auth.userId;
    }
    socket.userName = auth.userName;
    next();
});

io.on('connection', (socket) => {
    console.log(`id >> ${socket.id}`);
    console.log(users)
    socket.emit('get-users', users);
    socket.broadcast.emit('get-users', users);
    socket.emit('get-messages', messages);
    socket.broadcast.emit('get-messages', messages);

    console.log('connected');


    // socket.on('active-user-id', (data) => {
    // const room = messages.filter((item) => {
    //     item.roomId == data.id;
    // })
    // socket.emit('get-users-messages', room.messages)
    // });

    // socket.emit('set_rooms',rooms);

    // socket.on('add-room', ((data) => {
    //     socket.join('my_room');
    //     // console.log(data.roomName);
    // }))

    // socket.emit('user_id', socket.id);

    socket.on('send_message', (data) => {
        messages.push(data);
        socket.broadcast.emit('received_message', data);
        console.log(`${data.message} from ${socket.id}`);
    })
    // socket.on("disconnect",  (data) => {
    //     users =  users.filter((item) => {
    //         item.userId != socket.id
    //     })
    //     console.log('dis')
    //     console.log(socket.id);
    // });
})




app.get('/', (req, res) => {
    res.send('url are taken');
})


app.listen(3003, () => {
    console.log('express connsected with port 3003');
})
server.listen(process.env.PORT, () => console.log(`socket io  connected with port ${process.env.PORT}`));
