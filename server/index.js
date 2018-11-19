const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const now = require("performance-now");
const { Genome, Bike, Tron } = require("./tron/Game");

let userCount = 0;
let clientIds = [];
let currentData = [];
let targetDataSize = 0;
let targetGeneration = 2;
let timeInitial;
let timeFinal;
let currentGeneration = [];
let generation = 0;
let dataPoints = [];
let consoleLogs = [];
dataPoints.push(0);

const random = (low, high) => {
  return parseInt(Math.random() * (high - low)) + 1;
};

const batch = currentGeneration => {
  targetDataSize = 0;
  const nodes = userCount;
  let sizePerBatch = Math.floor(currentGeneration.length / nodes);
  let batches = [];

  for (let i = 0; i < nodes; i++) {
    let batch = [];
    for (let j = 0; j < sizePerBatch; j++) {
      batch.push(currentGeneration[j]);
    }

    targetDataSize += sizePerBatch % 2 == 0 ? sizePerBatch : sizePerBatch - 1;
    batches.push(batch);
  }

  return batches;
};

const calculateBatches = batches =>
  new Promise((resolve, reject) => {
    let i = 0;
    clientIds.forEach(clientId => {
      console.log(
        `Emitted batch task to ${clientId.id} of length ${batches[i].length}.`
      );
      consoleLogs.push(
        `Emitted batch task to ${clientId.id} of length ${batches[i].length}.`
      );

      io.sockets.emit("logUpdate", consoleLogs);
      io.sockets.connected[clientId.id].emit("assignWork", {
        genomes: batches[i++],
        function: "this is a function"
      });
      clientId.status = "Working";
      io.sockets.emit("userUpdate", clientIds);
      // TODO
    });
    resolve();
  });

for (let i = 0; i < 10000; i++) {
  currentGeneration.push(new Genome());
}

io.on("connection", client => {
  clientIds.push({
    id: client.id,
    userAgent: client.request.headers["user-agent"],
    status: "Ready"
  });
  client.emit("updateUUID", client.id);
  ++userCount;
  io.sockets.emit("userUpdate", clientIds);

  client.on("execute", () => {
    let index = -1;
    const compareId = client.id;
    clientIds.forEach((client, i) => {
      if (client.id === compareId) {
        index = i;
      }
    });
    --userCount;
    clientIds.splice(index, 1);

    timeInitial = now();
    let batches = batch(currentGeneration);

    calculateBatches(batches)
      .then(succes => {
        console.log("Successfully sent all batches.");
        consoleLogs.push("Successfully sent all batches.");
        io.sockets.emit("logUpdate", consoleLogs);
      })
      .catch(err => console.log(err));
  });

  client.on("doneWork", data => {
    data.forEach(point => currentData.push(point));
    console.log(
      `Received ${data.length} computations from client ${client.id}.`
    );
    consoleLogs.push(
      `Received ${data.length} computations from client ${client.id}.`
    );

    let index = -1;
    clientIds.forEach((client, i) => {
      if (client.id === client.id) {
        index = i;
      }
    });

    clientIds[index].status = "Ready";
    io.sockets.emit("userUpdate", clientIds);

    console.log(`Total calculations received: ${currentData.length}.`);
    consoleLogs.push(`Total calculations received: ${currentData.length}.`);

    io.sockets.emit("logUpdate", consoleLogs);
    if (currentData.length >= targetDataSize * 0.97) {
      console.log(
        `Achieved computation target of ${targetDataSize}. Going to next generation.`
      );

      consoleLogs.push(
        `Achieved computation target of ${targetDataSize}. Going to next generation.`
      );
      io.sockets.emit("logUpdate", consoleLogs);

      // process data for next generation
      currentData.sort((a, b) => {
        if (a.length < b.length) return 1;
        if (a.length > b.length) return -1;
        return 0;
      });

      dataPoints.push(currentData[0].length);
      io.sockets.emit("dataPointsUpdate", dataPoints);

      io.sockets.emit("genomeUpdate", {
        g1: currentData[0],
        g2: currentData[currentData.length - 1]
      });

      if (generation == targetGeneration) {
        io.sockets.emit("currentGenerationProgressUpdate", 100);

        timeFinal = now();
        console.log(`Achieved target generation of ${targetGeneration}.`);
        console.log(`Completed task in ${timeFinal - timeInitial} ms.`);
        console.log("Listening top genome lengths:");

        consoleLogs.push(`Achieved target generation of ${targetGeneration}.`);
        consoleLogs.push(`Completed task in ${timeFinal - timeInitial} ms.`);
        consoleLogs.push("Listening top genome lengths:");

        for (let i = 0; i < 5; i++) {
          consoleLogs.push(currentData[i].length);
          console.log(currentData[i].length);
        }

        io.sockets.emit("logUpdate", consoleLogs);

        return;
      }

      generation++;

      io.sockets.emit(
        "currentGenerationProgressUpdate",
        (100 * generation) / (targetGeneration + 1)
      );

      console.log(`Preparing generation ${generation}.`);
      consoleLogs.push(`Preparing generation ${generation}.`);
      io.sockets.emit("logUpdate", consoleLogs);

      let newGeneration = [];
      for (let i = 0; i < 1500; i++) newGeneration.push(currentData[i]);

      for (let i = 1500; i < 2500; i++) {
        let random1 = random(0, 149);
        let random2 = random(0, 149);
        newGeneration.push(
          new Genome(currentData[random1], currentData[random2])
        );
      }
      for (let i = 1; i < 1500; i++)
        newGeneration.push(new Genome(currentData[0], currentData[i]));
      for (let i = 2; i < 1500; i++)
        newGeneration.push(new Genome(currentData[1], currentData[i]));
      for (let i = 3; i < 1000; i++)
        newGeneration.push(new Genome(currentData[2], currentData[i]));
      for (let i = 4; i < 1000; i++)
        newGeneration.push(new Genome(currentData[3], currentData[i]));
      for (let i = 6; i < 16; i++)
        newGeneration.push(new Genome(currentData[4], currentData[i]));
      for (let i = 7500; i < 10000; i++) {
        let random1 = random(0, 100);
        newGeneration.push(new Genome(currentData[random1]));
      }

      console.log(`Successfully prepared generation ${generation}.`);
      consoleLogs.push(`Successfully prepared generation ${generation}.`);
      io.sockets.emit("logUpdate", consoleLogs);

      // send data out to clients
      let batches = batch(newGeneration);

      calculateBatches(batches)
        .then(succes => {
          console.log("Successfully sent all batches.");
          consoleLogs.push("Successfully sent all batches.");
          io.sockets.emit("logUpdate", consoleLogs);
        })
        .catch(err => console.log(err));
      currentData = [];
    }
  });

  client.on("disconnect", () => {
    let index = -1;
    clientIds.forEach((client, i) => {
      if (client.id === client.id) {
        index = i;
      }
    });
    clientIds.splice(index, 1);
    --userCount;
    io.sockets.emit("userUpdate", clientIds);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening to port ${port}.`));
