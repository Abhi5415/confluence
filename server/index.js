var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

const createWork = () => {
  const data = [];

  for (var i = 0; i < 10000; i++) {
    data.push({
      id: i,
      farRange: Math.random()
    });
  }

  const f = `x => x - Math.sin(x)`;

  return {
    function: f,
    data
  };
};

let userCount = 0;
let progressBar = 5;

// setInterval(() => {
//   if (progressBar >= 100) return;
//   progressBar += parseInt(Math.random() * 5);
//   io.sockets.emit("progressUpdate", ++progressBar);
// }, Math.random() * 300);

io.on("connection", client => {
  io.sockets.emit("userUpdate", ++userCount);
  io.sockets.emit("progressUpdate", progressBar);

  client.on("requestWork", data => {
    const parcel = createWork();
    client.emit("updateWorkStatus", { parcel });
    client.on("doneWork", data => console.log(data));
  });

  client.on("disconnect", () => {
    io.sockets.emit("userUpdate", --userCount);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening to port ${port}`));
