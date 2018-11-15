var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

// app.use(express.static(__dirname + "/bower_components"));

// app.get("/", function(req, res, next) {
//   res.sendFile(__dirname + "/index.html");
// });

io.on("connection", socket => {
  console.log("New node connected");

  socket.on("work", () => {
    console.log("Client requesting some data");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening to port ${port}`));
