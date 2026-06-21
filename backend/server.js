const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");


const app = express();


app.use(cors({
    origin: "*",
    methods: ["GET","POST"]
}));


app.use(express.json());


// frontend serve cheyyadaniki
app.use(express.static(
    path.join(__dirname,"../frontend")
));



app.get("/",(req,res)=>{

    res.send("Chat Server Running");

});



const server = http.createServer(app);



const io = new Server(server,{

    cors:{
        origin:"*",
        methods:["GET","POST"]
    }

});





io.on("connection",(socket)=>{


    console.log(
        "User connected:",
        socket.id
    );



    socket.on(
        "send_message",
        (data)=>{


            console.log(
                "Message:",
                data
            );



            io.emit(
                "receive_message",
                data
            );


        }
    );





    socket.on(
        "disconnect",
        ()=>{


            console.log(
                "User disconnected",
                socket.id
            );


        }
    );


});





const PORT = process.env.PORT || 5000;



server.listen(
    PORT,
    ()=>{

        console.log(
            "Chat Server Running on port",
            PORT
        );

    }
);