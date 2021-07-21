const express = require("express");
const app = express();
const mongoose = require('mongoose');
var http = require('http').createServer(app);
const cors = require("cors");
const PORT = 5000;
const mongooseDB = 'mongodb://localhost:27017/whatsapp_data';
const userRoute = require('./routes/users');
const conversationRoute = require('./routes/conversetion');
const messagesRoute = require('./routes/messages');

app.use(cors());
app.use(express.json());


mongoose.connect(mongooseDB, {useNewUrlParser:true,useUnifiedTopology:true})
        .then(() =>{
            console.log('Connected to mongoose database');
        }).catch(err => console.log(err));
var io = require('socket.io')(http, {
    cors: {
      origin: "*"
    }
});
const STATIC_CHANNELS = ['global_notifications', 'global_chat'];


app.use("/api/user",userRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/messages",messagesRoute);

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('send-message', message => {
        console.log(message);
        io.emit('message', message);
    });
});