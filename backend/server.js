const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");


const app = express();


// CORS
app.use(
    cors({
        origin: [
            "https://chat-app-six-kohl-38.vercel.app",
            "http://localhost:5000"
        ],
        methods: ["GET","POST"],
        credentials: true
    })
);


app.use(express.json());


// Frontend serve
app.use(
    express.static(
        path.join(__dirname,"../frontend")
    )
);



const server = http.createServer(app);



const io = new Server(server,{

    cors:{
        origin:[
            "https://chat-app-six-kohl-38.vercel.app",
            "http://localhost:5000"
        ],
        methods:["GET","POST"],
        credentials:true
    }

});




// test route

app.get("/",(req,res)=>{

    res.send("Chat Server Running");

});





io.on("connection",(socket)=>{


    console.log("Connected:",socket.id);



    socket.on("send_message",(data)=>{


        console.log("Message received:",data);



        io.emit(
            "receive_message",
            data
        );


    });




    socket.on("disconnect",()=>{


        console.log(
            "Disconnected:",
            socket.id
        );


    });


});






const PORT = process.env.PORT || 5000;


server.listen(
    PORT,
    "0.0.0.0",
    ()=>{

    console.log(
        "Server running on port",
        PORT
    );

});