// import {io} from 'socket.io-client';
const socket=io('http://localhost:9898');

socket.on('firstconvo',()=>{
    console.log("hi");
});