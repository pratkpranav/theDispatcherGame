const app = require('express')();
const http = require('http').createServer(app, {
    cookie:true
});
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static')
const io = require('socket.io')(http,{
    cors: {
        origin: 'http://localhost:8080',
        method: ["GET","POST"]
    }
});
const { v4: uuidv4 } = require('uuid');
const cookie = require('cookie');
const cookieIoParser = require('socket.io-cookie-parser');




app.use(cors())
app.use((serveStatic(__dirname + "/FormsApp/dist")));

io.use(cookieIoParser());


let responses = [];
let curresp = [];
let totalslides = 4;
let current = 1;
let statestore = {};



io.on('connection', function(socket){

    let roomId = uuidv4();
    socket.join(roomId);
    console.log(roomId);
    console.log(socket.rooms);
    statestore[roomId] = 0;
    console.log(socket.rooms.has(roomId));
    
    
    socket.on('NextScene',function(socketID){
        responses.push(curresp);
        console.log('Sending Next Scene');
        current++;
        if(current<totalslides+1){
            io.to(roomId).emit('placeScene', current);
            if(current == totalslides){
                io.to(roomId).emit('deleteNext');
            }
        }
    })


    socket.on('selectedCustomer',function(carId,customerID){
        console.log('Received Car Input')
        let cur = [];
        cur.push(carId);
        cur.push(customerID);
        console.log(roomId, cur);
        curresp.push(cur);
        io.to(roomId).emit('disableCarCustomerInteractivity',cur);
    })
    
    socket.on('createDots',function(){
        console.log('Making Dots Work!!');
        io.to(roomId).emit('makeDotsWork');
    })

    socket.on('survey-data',function(data){
        console.log(roomId,data);
    })

    
})


const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log('Server Started');
        });