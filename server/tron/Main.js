const { Genome, Bike, Tron } = require("./Game");

const playGame = (g1, g2) => {
  g1.length = 0;
  g2.length = 0;
  let tron = new Tron();
  return tron.returnWinner(g1, g2);
};

const random = (low, high) => {
  return parseInt(Math.random() * (high - low)) + 1;
};

grid = [];
for (let i = 0; i < 17; i++) {
  let to_push = [];
  for (let j = 0; j < 17; j++) {
    to_push.push(".");
  }
  grid.push(to_push);
}

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    grid[i][j] = ".";
  }
}

for (let i = 0; i < 17; i++) {
  grid[0][i] = "w";
  grid[i][0] = "w";
  grid[16][i] = "w";
  grid[i][16] = "w";
}

let s = new Bike(8, 14);
let p = new Bike(8, 2);
grid[s.row][s.col] = "s";
grid[p.row][p.col] = "p";

currentGeneration = [];

// make initial generation
for (let i = 0; i < 10000; i++) {
  currentGeneration.push(new Genome());
}

for (let generation = 0; generation < 50; generation++) {
  console.log("Generation " + generation);
  newGeneration = [];
  for (let i = 0; i < currentGeneration.length; i += 2) {
    let r = playGame(currentGeneration[i], currentGeneration[i + 1]);

    if (generation >= 40) {
      r.winner.length -= r.loser.length;
    }

    newGeneration.push(r.loser);
    newGeneration.push(r.winner);
  }

  newGeneration.sort((a, b) => {
    if (a.length < b.length) return 1;
    if (a.length > b.length) return -1;
    return 0;
  });

  if (generation == 2) {
    for (let i = 0; i < 50; i++) {
      console.log(newGeneration[i].length);
    }
  }

  currentGeneration = [];
  for (let i = 0; i < 1500; i++) {
    currentGeneration.push(newGeneration[i]);
  }
  for (let i = 1500; i < 8000; i++) {
    let random1 = random(0, 149);
    let random2 = random(0, 149);
    currentGeneration.push(
      new Genome(newGeneration[random1], newGeneration[random2])
    );
  }
  for (let i = 1; i < 1500; i++) {
    currentGeneration.push(new Genome(newGeneration[0], newGeneration[i]));
  }
  for (let i = 2; i < 1500; i++) {
    currentGeneration.push(new Genome(newGeneration[1], newGeneration[i]));
  }
  for (let i = 3; i < 1500; i++) {
    currentGeneration.push(new Genome(newGeneration[2], newGeneration[i]));
  }
  for (let i = 4; i < 1500; i++) {
    currentGeneration.push(new Genome(newGeneration[3], newGeneration[i]));
  }
  for (let i = 6; i < 16; i++) {
    currentGeneration.push(new Genome(newGeneration[4], newGeneration[i]));
  }
  for (let i = 7500; i < 10000; i++) {
    let random1 = random(0, 100);
    currentGeneration.push(new Genome(newGeneration[random1]));
  }
}
