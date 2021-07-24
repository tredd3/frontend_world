const express = require("express");
const app = express();
const path = require("path");
//using express with socket.io - below is the procedure to share the https server
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// OR
// const { Server } = require("socket.io");
// const io = new Server(server);

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
app.use(express.static(path.join(__dirname, "public")));

const usersList = [];

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

//adapter is the incharege of a given room and is responsible for brodcasting events to all the clients in the room
io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});

io.on("connection", (socket) => {
  usersList.push(socket);
  // console.log("user connected");
  // console.log(socket.id);
  socket.join("tarak");
  // when the client emits 'new message', this listens and executes
  socket.on("chat message", (msg) => {
    console.log(msg);

    //In order to send an event to everyone, Socket.IO gives us the io.emit() method.
    io.emit("chat message", { message: msg });

    // If you want to send a message to everyone except for a certain emitting socket
    socket.broadcast.emit("chat message", {
      username: socket.username,
      message: msg,
    });
  });

  socket.on("update item", (arg1, arg2, callback) => {
    console.log(arg1); // 1
    console.log(arg2); // { name: "updated" }
    callback({
      status: "ok",
    });
  });

  socket.on("ping", (count) => {
    console.log(count);
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    console.log("user disconnected");
    //if you refresh a tab several times you can see it in action.
    // echo globally that this client has left
    socket.broadcast.emit("user left", {
      username: socket.username,
    });
  });
});
