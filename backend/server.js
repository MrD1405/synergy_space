import express from 'express';
import { Server } from 'socket.io';
const app=express();
const roomId='EYYfy';
let clientId=8989;
let dict=[];
app.use(express.static('public'));

// app.get('/homepage',(req,res)=>{
//     res.sendFile(path.join());
// })
const httpServer=app.listen(9898);
const io=new Server(httpServer,{
    cors:[
        'http://localhost:9898',
    ]
});
app.get('/',(req,res)=>{
    res.send("hi");
})

const state={
    'EYYfy':{
        players:[
          
        ]
    }
};
console.log(state[roomId]);
io.on('connection',socket=>{
    

    socket.on("addMember",(data)=>{
        // console.log(socket.id);
        if(data===undefined)return;
        const {x,y,vel}=getPlayerInfo();
        socket.join(roomId);
        socket.emit("playerInfo",{clientId,x,y,vel});
        socket.emit("allMembers",getPlayersData(roomId));//to sender

        state[roomId].players.push({
            clientId:clientId,
            x:x,
            y:y,
            vel:{x:0,y:0}
        })
        socket.to(roomId).emit("newMember",[clientId,x,y,vel]);// to all already present in the server except the sender
        
        clientId++; 
        //randomPosition()//random coordinates on phaser window;
        
        

       
        
        


    })
    socket.on("playerMovement",(data)=>{
        console.log(data);
        socket.to(roomId).emit("otherPlayerMovement",data);
    })
    
})
function getPlayerInfo(){
    const {x,y,vel}= {x:Math.floor(400*(Math.random())),y:Math.floor(200*(Math.random())),vel:{x:0,y:0}};
    return {x,y,vel};
}
function getAllMembers(){
    const room=io.sockets.clients(roomId);
}
function getPlayersData(roomId){
    const room =io.sockets.adapter.rooms.get(roomId);
    const players={};
    if(room)return state[roomId].players;
}
io.on('updateVelocity',data=>{
    console.log("this is the player instance"+data);
})

