const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');

//creating an http server by wrapping an express server inside it
const server = http.Server(app);
const io = socketio(server);
const path = require('path');

app.use('/',express.static(path.join(__dirname,'static')))


//creating a mapping object so that each client's id is mapped to his name
const mapping = {};



//this "socket" argument refers to the same socket that is created on the client side
//therefore both server and client are refering to the same socket , therefore the connection
//is created(basically)
io.on('connection',(socket)=>{
    
    console.log(socket.id + "========>>CONNECTED");
    

   socket.on('login',(data)=>{
      
    mapping[socket.id] = data.name;
    // console.log(data.name)

   }) 

    socket.on('send-msg',(data)=>{
        // console.log(`${socket.id} said ${data.msg}`);
        //now when the client emits the message here we are listening to it on the server side
        //now when we will listen the event we will emit the message back to
        //all the connected clients
        //and this is basically what happens in a group chat


        //here we are not emmiting to the same socket from whome we listenedd the event
        //but instead after listening that event
        // we are now emmiting to "io" object so that it will emit to all the sockets (i.e all the clients)
        //because all the sockets are inside io , therefore it will be shown to all the clients
        io.emit('received-msg',{
            //now we are sending the name and msg
            name: mapping[socket.id] , 
            msg:data.msg
        }) 
            

    })

})






server.listen('3000',()=>{

    console.log('Server running at Port 3000');
})