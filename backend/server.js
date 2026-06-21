const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");


const app = express();


app.use(cors());


app.use(express.json());


// frontend folder serve cheyyadam
app.use(express.static(path.join(__dirname, "../frontend")));



const server = http.createServer(app);



const io = new Server(server, {

    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }

});




// home page
app.get("/", (req,res)=>{

    res.sendFile(
        path.join(__dirname,"../frontend/index.html")
    );

});





io.on("connection",(socket)=>{


    console.log("User connected:", socket.id);



    socket.on("send_message",(data)=>{


        console.log("Message received:", data);



        // andariki message pampistundi
        io.emit("receive_message", data);


    });





    socket.on("disconnect",()=>{


        console.log("User disconnected:", socket.id);


    });



});





// IMPORTANT for other devices
server.listen(5000,"0.0.0.0",()=>{


    console.log("Server running on port 5000");


});