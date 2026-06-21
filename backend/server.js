const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");


const app = express();


// Allow frontend from Vercel + local testing
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


// frontend files serve
app.use(express.static(path.join(__dirname, "../frontend")));



const server = http.createServer(app);



const io = new Server(server, {

    cors: {
        origin: [
            "https://chat-app-six-kohl-38.vercel.app",
            "http://localhost:5000"
        ],
        methods:["GET","POST"],
        credentials:true
    }

});





// Home page

app.get("/", (req,res)=>{

    res.sendFile(
        path.join(__dirname,"../frontend/index.html")
    );

});






io.on("connection",(socket)=>{


    console.log("User connected:",socket.id);



    socket.on("send_message",(data)=>{


        console.log("Message:",data);


        io.emit(
            "receive_message",
            data
        );


    });





    socket.on("disconnect",()=>{


        console.log("User disconnected:",socket.id);


    });



});







server.listen(5000,"0.0.0.0",()=>{


    console.log("Server running on port 5000");


});