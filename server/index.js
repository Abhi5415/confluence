var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

// app.use(express.static(__dirname + "/bower_components"));

// app.get("/", function(req, res, next) {
//   res.sendFile(__dirname + "/index.html");
// });

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

io.on("connection", client => {
  client.on("requestWork", data => {
    const parcel = createWork();
    client.emit("updateWorkStatus", { parcel });
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening to port ${port}`));
