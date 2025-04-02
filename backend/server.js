import express from 'express';
import { Server } from 'socket.io';
const app=express();
const roomId='EYYfy';
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
//proposed json structure
// state:{
//     player:{
//         clientId:
//         Name:
//         vel:{x,y}
//         x:
//         y:
//         gender:
//          
//     }
// }
io.on('connection',socket=>{
    console.log("hi "+socket.id);

    socket.on("AddMember",()=>{
        socket.join(roomId);
        const {x,y}=randomPosition();
        socket.emit("newMember",socket)
            

        //for all members in the room broadcast the user details for now keep only male charcaters for everyone ..so it shd contain x,y,vel,
        //only when one user clicks arrow button update their velocity else let it be constant
        //event for clickdown and clickup broadcast this instead of x,y coordinates each client with that client.id will have their velocity updated..


    })
    
})
io.on('updateVelocity',data=>{
    console.log("this is the player instance"+data);
})

