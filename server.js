const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user-connected", username);
  });
  socket.on("send-msg", (msg) => {
    socket.broadcast.emit("chat-msg", { username: users[socket.id], msg: msg });
  });
});
