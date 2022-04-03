const server = require('express');
const app = server();
const https = require('http').createServer(app);
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static')
const fs = require('fs');
const io = require('socket.io')(https,{
    cors: {
        origin: '*',
        method: ["GET","POST"]
    }
});
const { v4: uuidv4 } = require('uuid');
const dateTime = require('node-datetime');
const storeDirectory  = "./Data/";
const util = require('util');

class StateMachine{
    constructor(id, startTime){
        this.id = id;
        this.currentState = 1;
        this.stateData = [];
        this.startTime = startTime;
        this.endTime = null;
    }

    endTime(endTime){
        this.endTime = endTime;
    }

    surveyData(surveyData){
        this.surveyData = surveyData;
    }
}

app.use(cors())
app.use((serveStatic(__dirname + "/FormsApp/dist")));


let totalslides = 4;
let statestore = [];



io.on('connection', function(socket){

    let roomId = uuidv4();
    socket.join(roomId);
    console.log(roomId);
    console.log(socket.rooms);
    console.log(socket.rooms.has(roomId));
    let dt = dateTime.create();
    let formatted = dt.format('Y-m-d H:M:S');
    let newState = new StateMachine(roomId, formatted);
    statestore.push(newState);
    
    socket.on('NextScene',function(socketID){
        console.log('Sending Next Scene');
        let current = 0;
        for(let i=0; i<statestore.length; i++){
            if(statestore[i].id === roomId){
                current = statestore[i].currentState+1;
                statestore[i].currentState+=1;
                break;
            }
        }
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
        for(let i=0; i<statestore.length; i++){
            if(statestore[i].id === roomId){
                if(statestore[i].stateData.length<statestore[i].currentState){
                    statestore[i].stateData.push([]);
                    statestore[i].stateData[statestore[i].currentState-1].push(cur);
                    break;
                }else{
                    statestore[i].stateData[statestore[i].currentState-1].push(cur);
                }
            }
        }
        console.log(roomId, cur);
        io.to(roomId).emit('disableCarCustomerInteractivity',cur);
    })
    
    socket.on('createDots',function(){
        console.log('Making Dots Work!!');
        io.to(roomId).emit('makeDotsWork');
    })

    socket.on('survey-data',function(data){

        console.log(roomId,data);
        let finalId = 0;
        for(let i=0; i<statestore.length; i++){
            if(statestore[i].id === roomId){
                statestore[i].surveyData(data);
                finalId = i;
            }
        }
        let fileName = roomId.concat(".json");
        console.log(fileName);
        fs.writeFile(path.join(__dirname,"Data",fileName), JSON.stringify(statestore[finalId]), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
        console.log(statestore[finalId]);
        let finalMessage = "Your token is ";
        let message = finalMessage.concat(roomId, ". You can close the Tab.");
        let dt = dateTime.create();
        let formatted = dt.format('Y-m-d H:M:S');
        statestore[finalId].endTime = formatted;
        io.to(roomId).emit('couponCode', message);
    })
})


const port = process.env.PORT || 3000; 

https.listen(port, () => {
    console.log('Server Started');
});
