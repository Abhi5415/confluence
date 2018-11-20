const RANDOM_LOWER_BOUND = -10;
const RANDOM_UPPER_BOUND = 10;
const RANDOM_MULTIPLIER_UPPER = 1.8;
const RANDOM_MULTIPLIER_LOWER = 0.2;

class Bike {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

class Result {
  constructor(winner, loser) {
    this.winner = winner;
    this.loser = loser;
    this.loserPoints = 0;
    this.winnerPoints = 0;
  }
}

class DFS {
  constructor(graph, start) {
    this.graph = graph;
    this.start = start;
    this.visited = [];
    for (let i = 0; i < graph.length; i++) {
      let to_push = [];
      for (let j = 0; j < graph[0].length; j++) {
        to_push.push(false);
      }
      this.visited.push(to_push);
    }
    this.counter = 0;
    this.start = start;
  }

  dfs() {
    this.dfs_driver(this.graph, this.start);
    return this.counter;
  }

  dfs_driver(graph, start) {
    if (start.row < 1 || start.col < 1 || start.row >= 16 || start.col >= 17)
      return;
    if (this.visited[start.row][start.col]) return;
    let c = graph[start.row][start.col];

    if (c !== ".") return;
    this.counter++;

    this.visited[start.row][start.col] = true;

    this.dfs_driver(graph, new Bike(start.row - 1, start.col));
    this.dfs_driver(graph, new Bike(start.row + 1, start.col));
    this.dfs_driver(graph, new Bike(start.row, start.col - 1));
    this.dfs_driver(graph, new Bike(start.row, start.col + 1));
  }
}

class Genome {
  constructor(g1, g2) {
    if (g1 && g2) {
      this.closeFreespace = this.random(g1.closeFreespace, g2.closeFreespace);
      this.closeWallDistance = this.random(
        g1.closeWallDistance,
        g2.closeWallDistance
      );
      this.closeRelativeEnemyX = [];
      this.closeRelativeEnemyX.push(
        this.random(g1.closeRelativeEnemyX[0], g2.closeRelativeEnemyX[0])
      );
      this.closeRelativeEnemyX.push(
        this.random(g1.closeRelativeEnemyX[1], g2.closeRelativeEnemyX[1])
      );
      this.closeRelativeEnemyX.push(
        this.random(g1.closeRelativeEnemyX[2], g2.closeRelativeEnemyX[2])
      );
      this.closeRelativeEnemyY = [];
      this.closeRelativeEnemyY.push(
        this.random(g1.closeRelativeEnemyY[0], g2.closeRelativeEnemyY[0])
      );
      this.closeRelativeEnemyY.push(
        this.random(g1.closeRelativeEnemyY[1], g2.closeRelativeEnemyY[1])
      );
      this.closeRelativeEnemyY.push(
        this.random(g1.closeRelativeEnemyY[2], g2.closeRelativeEnemyY[2])
      );
      this.farFreespace = this.random(g1.farFreespace, g2.farFreespace);
      this.farWallDistance = this.random(
        g1.farWallDistance,
        g2.farWallDistance
      );
      this.farRelativeEnemyX = [];
      this.farRelativeEnemyX.push(
        this.random(g1.farRelativeEnemyX[0], g2.farRelativeEnemyX[0])
      );
      this.farRelativeEnemyX.push(
        this.random(g1.farRelativeEnemyX[1], g2.farRelativeEnemyX[1])
      );
      this.farRelativeEnemyX.push(
        this.random(g1.farRelativeEnemyX[2], g2.farRelativeEnemyX[2])
      );
      this.farRelativeEnemyY = [];
      this.farRelativeEnemyY.push(
        this.random(g1.farRelativeEnemyY[0], g2.farRelativeEnemyY[0])
      );
      this.farRelativeEnemyY.push(
        this.random(g1.farRelativeEnemyY[1], g2.farRelativeEnemyY[1])
      );
      this.farRelativeEnemyY.push(
        this.random(g1.farRelativeEnemyY[2], g2.farRelativeEnemyY[2])
      );
      this.length = 0;
      this.farDFS = this.random(g1.farDFS, g2.farDFS);
      this.closeDFS = this.random(g1.closeDFS, g2.closeDFS);
    } else if (g1) {
      this.closeFreespace =
        g1.closeFreespace *
        this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
      this.closeWallDistance =
        g1.closeWallDistance *
        this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
      this.closeRelativeEnemyX = [];
      this.closeRelativeEnemyX.push(
        g1.closeRelativeEnemyX[0] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.closeRelativeEnemyX.push(
        g1.closeRelativeEnemyX[1] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.closeRelativeEnemyX.push(
        g1.closeRelativeEnemyX[2] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.closeRelativeEnemyY = [];
      this.closeRelativeEnemyY.push(
        g1.closeRelativeEnemyY[0] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.closeRelativeEnemyY.push(
        g1.closeRelativeEnemyY[1] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.closeRelativeEnemyY.push(
        g1.closeRelativeEnemyY[2] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.farFreespace =
        g1.farFreespace *
        this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
      this.farWallDistance =
        g1.farWallDistance *
        this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
      this.farRelativeEnemyX = [];
      this.farRelativeEnemyX.push(
        g1.farRelativeEnemyX[0] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.farRelativeEnemyX.push(
        g1.farRelativeEnemyX[1] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.farRelativeEnemyX.push(
        g1.farRelativeEnemyX[2] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.farRelativeEnemyY = [];
      this.farRelativeEnemyY.push(
        g1.farRelativeEnemyY[0] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.farRelativeEnemyY.push(
        g1.farRelativeEnemyY[1] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.farRelativeEnemyY.push(
        g1.farRelativeEnemyY[2] *
          this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER)
      );
      this.length = 0;
      this.farDFS =
        g1.farDFS *
        this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
      this.closeDFS =
        g1.closeDFS *
        this.random(RANDOM_MULTIPLIER_UPPER, RANDOM_MULTIPLIER_LOWER);
    } else {
      this.closeFreespace = this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
      this.closeWallDistance = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.closeRelativeEnemyX = [];
      this.closeRelativeEnemyX.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.closeRelativeEnemyX.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.closeRelativeEnemyX.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.closeRelativeEnemyY = [];
      this.closeRelativeEnemyY.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.closeRelativeEnemyY.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.closeRelativeEnemyY.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.farFreespace = this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
      this.farWallDistance = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.farRelativeEnemyX = [];
      this.farRelativeEnemyX.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.farRelativeEnemyX.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.farRelativeEnemyX.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.farRelativeEnemyY = [];
      this.farRelativeEnemyY.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.farRelativeEnemyY.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.farRelativeEnemyY.push(
        this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND)
      );
      this.currDirection = "u";
      this.didWin = false;
      this.length = 0;
      this.farDFS = this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
      this.closeDFS = this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
    }

    this.grid = [];
    for (let i = 0; i < 17; i++) {
      let to_push = [];
      for (let j = 0; j < 17; j++) {
        to_push.push(".");
      }
      this.grid.push(to_push);
    }
  }

  random(low, high) {
    if (low > high) {
      let t = low;
      low = high;
      high = t;
    }
    return Math.random() * (high - low + 1) + low;
  }

  DFS(position, grid) {
    let dfs = new DFS(grid, position);
    return dfs.dfs();
  }

  nextMove(grid, myPosition, enemyPosition, currentDirection) {
    let ratingS = 0;
    let ratingL = 0;
    let ratingR = 0;

    let isFar =
      Math.sqrt(
        Math.pow(this.relativeX(myPosition, enemyPosition), 2) +
          Math.pow(this.relativeY(myPosition, enemyPosition), 2)
      ) < 6;

    let moveL = "s";
    let moveR = "s";
    let bikeS = new Bike(0, 0);
    let bikeL = new Bike(0, 0);
    let bikeR = new Bike(0, 0);

    switch (currentDirection) {
      case "u":
        moveL = "l";
        moveR = "r";
        bikeS = new Bike(myPosition.row - 1, myPosition.col);
        bikeL = new Bike(myPosition.row, myPosition.col - 1);
        bikeR = new Bike(myPosition.row, myPosition.col + 1);
        break;
      case "d":
        moveL = "r";
        moveR = "l";
        bikeS = new Bike(myPosition.row + 1, myPosition.col);
        bikeL = new Bike(myPosition.row, myPosition.col + 1);
        bikeR = new Bike(myPosition.row, myPosition.col - 1);
        break;
      case "r":
        moveL = "u";
        moveR = "d";
        bikeS = new Bike(myPosition.row, myPosition.col + 1);
        bikeL = new Bike(myPosition.row - 1, myPosition.col);
        bikeR = new Bike(myPosition.row + 1, myPosition.col);
        break;
      case "l":
        moveL = "d";
        moveR = "u";
        bikeS = new Bike(myPosition.row, myPosition.col - 1);
        bikeL = new Bike(myPosition.row + 1, myPosition.col);
        bikeR = new Bike(myPosition.row - 1, myPosition.col);
        break;
      default:
        break;
    }

    if (isFar) {
      ratingS +=
        this.distanceToNearestObstacle(
          this.grid,
          this.myPosition,
          this.currentDirection
        ) * this.farWallDistance;
      ratingL +=
        this.distanceToNearestObstacle(this.grid, myPosition, moveL) *
        this.farWallDistance;
      ratingR +=
        this.distanceToNearestObstacle(this.grid, myPosition, moveR) *
        this.farWallDistance;
      ratingS += this.freeSpacesAtIndex(this.grid, bikeS) * this.farFreespace;
      ratingL += this.freeSpacesAtIndex(this.grid, bikeL) * this.farFreespace;
      ratingR += this.freeSpacesAtIndex(this.grid, bikeR) * this.farFreespace;
      ratingS +=
        this.relativeX(bikeS, enemyPosition) * this.farRelativeEnemyX[0];
      ratingL +=
        this.relativeX(bikeL, enemyPosition) * this.farRelativeEnemyX[1];
      ratingR +=
        this.relativeX(bikeR, enemyPosition) * this.farRelativeEnemyX[2];
      ratingS +=
        this.relativeY(bikeS, enemyPosition) * this.farRelativeEnemyY[0];
      ratingL +=
        this.relativeY(bikeL, enemyPosition) * this.farRelativeEnemyY[1];
      ratingR +=
        this.relativeY(bikeR, enemyPosition) * this.farRelativeEnemyY[2];
      ratingS += this.DFS(bikeS, this.grid) * this.farDFS;
      ratingL += this.DFS(bikeL, this.grid) * this.farDFS;
      ratingR += this.DFS(bikeR, this.grid) * this.farDFS;
    } else {
      ratingS +=
        this.distanceToNearestObstacle(
          this.grid,
          myPosition,
          currentDirection
        ) * this.closeWallDistance;
      ratingL +=
        this.distanceToNearestObstacle(this.grid, myPosition, moveL) *
        this.closeWallDistance;
      ratingR +=
        this.distanceToNearestObstacle(this.grid, myPosition, moveR) *
        this.closeWallDistance;
      ratingS += this.freeSpacesAtIndex(this.grid, bikeS) * this.closeFreespace;
      ratingL += this.freeSpacesAtIndex(this.grid, bikeL) * this.closeFreespace;
      ratingR += this.freeSpacesAtIndex(this.grid, bikeR) * this.closeFreespace;
      ratingS +=
        this.relativeX(bikeS, enemyPosition) * this.closeRelativeEnemyX[0];
      ratingL +=
        this.relativeX(bikeL, enemyPosition) * this.closeRelativeEnemyX[1];
      ratingR +=
        this.relativeX(bikeR, enemyPosition) * this.closeRelativeEnemyX[2];
      ratingS +=
        this.relativeY(bikeS, enemyPosition) * this.closeRelativeEnemyY[0];
      ratingL +=
        this.relativeY(bikeL, enemyPosition) * this.closeRelativeEnemyY[1];
      ratingR +=
        this.relativeY(bikeR, enemyPosition) * this.closeRelativeEnemyY[2];
      ratingS += this.DFS(bikeS, this.grid) * this.closeDFS;
      ratingL += this.DFS(bikeL, this.grid) * this.closeDFS;
      ratingR += this.DFS(bikeR, this.grid) * this.closeDFS;
    }

    if (!this.isValidMove(bikeS, this.grid)) ratingS -= 200;
    if (!this.isValidMove(bikeL, this.grid)) ratingL -= 200;
    if (!this.isValidMove(bikeR, this.grid)) ratingR -= 200;

    if (ratingS >= ratingL && ratingS >= ratingR) {
      return "s";
    } else if (ratingL >= ratingS && ratingL >= ratingR) {
      return "l";
    } else {
      return "r";
    }
  }

  isValidMove(b, grid) {
    let r = b.row;
    let c = b.col;

    if (!(r >= 1 && r <= 15 && c >= 1 && c <= 1)) return false;

    return grid[r][c] === ".";
  }

  distanceToNearestObstacle(state, curr, direction) {
    switch (direction) {
      case "u":
        for (let i = curr.row - 1; i >= 0; i--) {
          if (state[i][curr.col] !== ".") {
            return Math.abs(curr.row - i - 1);
          }
        }
        break;
      case "d":
        for (let i = curr.row + 1; i < state.length; i++) {
          if (state[i][curr.col] !== ".") {
            return Math.abs(i - curr.row - 1);
          }
        }
        break;
      case "l":
        for (let i = curr.col - 1; i >= 0; i--) {
          if (state[curr.row][i] !== ".") {
            return Math.abs(curr.col - i - 1);
          }
        }
        break;
      case "r":
        for (let i = curr.col + 1; i < state[0].length; i++) {
          if (state[curr.row][i] !== ".") {
            return Math.abs(i - curr.col - 1);
          }
        }
        break;
      default:
        return -1;
    }
  }

  freeSpacesAtIndex(state, b) {
    let x = b.row;
    let y = b.col;

    let res = 0;

    for (let r = x - 2; r < x + 3; r++) {
      for (let c = y - 2; c < y + 3; c++) {
        // validate bounds
        if (r < 0 || r >= state.length || c < 0 || c >= state.length) continue;

        if (state[r][c] === ".") res++;
      }
    }

    return res;
  }

  relativeX(b1, b2) {
    return b2.col - b1.col;
  }

  relativeY(b1, b2) {
    return b2.row - b1.row;
  }
}

class Tron {
  constructor() {
    this.grid = [];
    this.setGrid();
    this.bike1Row = 8;
    this.bike1Column = 2;
    this.bike2Row = 8;
    this.bike2Column = 14;
    this.bike1Direction = "r";
    this.bike2Direction = "l";
    this.bike1Dead = false;
    this.bike2Dead = false;
    this.bike1Length = 0;
    this.bike2Length = 0;
    this.gameOver = false;
    this.move = " ";
  }

  setGrid() {
    for (let i = 0; i < 17; i++) {
      let to_push = [];
      for (let j = 0; j < 17; j++) {
        to_push.push(".");
      }
      this.grid.push(to_push);
    }
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        this.grid[i][j] = ".";
      }
    }
    for (let i = 0; i < 17; i++) {
      this.grid[0][i] = "w";
      this.grid[i][0] = "w";
      this.grid[16][i] = "w";
      this.grid[i][16] = "w";
    }
    let s = new Bike(8, 14);
    let p = new Bike(8, 2);
    this.grid[s.row][s.col] = "p";
    this.grid[p.row][p.col] = "s";
  }

  isValidMove(row, column, direction) {
    if (direction === "u") {
      if (this.move === "l") {
        if (this.grid[row][column - 1] !== ".") {
          return false;
        }
      } else if (this.move === "r") {
        if (this.grid[row][column + 1] !== ".") {
          return false;
        }
      } else if (this.move === "s") {
        if (this.grid[row - 1][column] !== ".") {
          return false;
        }
      }
    } else if (direction === "d") {
      if (this.move === "l") {
        if (this.grid[row][column + 1] !== ".") {
          return false;
        }
      } else if (this.move === "r") {
        if (this.grid[row][column - 1] !== ".") {
          return false;
        }
      } else if (this.move === "s") {
        if (this.grid[row + 1][column] !== ".") {
          return false;
        }
      }
    } else if (direction === "l") {
      if (this.move === "l") {
        if (this.grid[row + 1][column] !== ".") {
          return false;
        }
      } else if (this.move === "r") {
        if (this.grid[row - 1][column] !== ".") {
          return false;
        }
      } else if (this.move === "s") {
        if (this.grid[row][column - 1] !== ".") {
          return false;
        }
      }
    } else if (direction === "r") {
      if (this.move === "l") {
        if (this.grid[row - 1][column] !== ".") {
          return false;
        }
      } else if (this.move === "r") {
        if (this.grid[row + 1][column] !== ".") {
          return false;
        }
      } else if (this.move === "s") {
        if (this.grid[row][column + 1] !== ".") {
          return false;
        }
      }
    }
    return true;
  }

  makeMove(firstMove, secondMove) {
    this.move = firstMove;
    if (
      !this.bike1Dead &&
      this.isValidMove(this.bike1Row, this.bike1Column, this.bike1Direction)
    ) {
      this.bike1Length++;
      if (this.bike1Direction === "u") {
        if (firstMove === "l") {
          this.grid[this.bike1Row][this.bike1Column - 1] = "s";
          this.bike1Column -= 1;
          this.bike1Direction = "l";
        } else if (firstMove === "r") {
          this.grid[this.bike1Row][this.bike1Column + 1] = "s";
          this.bike1Column += 1;
          this.bike1Direction = "r";
        } else if (firstMove === "s") {
          this.grid[this.bike1Row - 1][this.bike1Column] = "s";
          this.bike1Row -= 1;
        }
      } else if (this.bike1Direction === "d") {
        if (firstMove === "l") {
          this.grid[this.bike1Row][this.bike1Column + 1] = "s";
          this.bike1Column += 1;
          this.bike1Direction = "r";
        } else if (firstMove === "r") {
          this.grid[this.bike1Row][this.bike1Column - 1] = "s";
          this.bike1Column -= 1;
          this.bike1Direction = "l";
        } else if (firstMove === "s") {
          this.grid[this.bike1Row + 1][this.bike1Column] = "s";
          this.bike1Row += 1;
        }
      } else if (this.bike1Direction === "l") {
        if (firstMove === "l") {
          this.grid[this.bike1Row + 1][this.bike1Column] = "s";
          this.bike1Row += 1;
          this.bike1Direction = "d";
        } else if (firstMove === "r") {
          this.grid[this.bike1Row - 1][this.bike1Column] = "s";
          this.bike1Row -= 1;
          this.bike1Direction = "u";
        } else if (firstMove === "s") {
          this.grid[this.bike1Row][this.bike1Column - 1] = "s";
          this.bike1Column -= 1;
        }
      } else if (this.bike1Direction === "r") {
        if (firstMove === "l") {
          this.grid[this.bike1Row - 1][this.bike1Column] = "s";
          this.bike1Row -= 1;
          this.bike1Direction = "u";
        } else if (firstMove === "r") {
          this.grid[this.bike1Row + 1][this.bike1Column] = "s";
          this.bike1Row += 1;
          this.bike1Direction = "d";
        } else if (firstMove === "s") {
          this.grid[this.bike1Row][this.bike1Column + 1] = "s";
          this.bike1Column += 1;
        }
      }
    } else {
      this.bike1Dead = true;
    }

    this.move = secondMove;

    if (
      !this.bike2Dead &&
      this.isValidMove(this.bike2Row, this.bike2Column, this.bike2Direction)
    ) {
      this.bike2Length++;
      if (this.bike2Direction === "u") {
        if (secondMove === "l") {
          this.grid[this.bike2Row][this.bike2Column - 1] = "p";
          this.bike2Column -= 1;
          this.bike2Direction = "l";
        } else if (secondMove === "r") {
          this.grid[this.bike2Row][this.bike2Column + 1] = "p";
          this.bike2Column += 1;
          this.bike2Direction = "r";
        } else if (secondMove === "s") {
          this.grid[this.bike2Row - 1][this.bike2Column] = "p";
          this.bike2Row -= 1;
        }
      } else if (this.bike2Direction === "d") {
        if (secondMove === "l") {
          this.grid[this.bike2Row][this.bike2Column + 1] = "p";
          this.bike2Column += 1;
          this.bike2Direction = "r";
        } else if (secondMove === "r") {
          this.grid[this.bike2Row][this.bike2Column - 1] = "p";
          this.bike2Column -= 1;
          this.bike2Direction = "l";
        } else if (secondMove === "s") {
          this.grid[this.bike2Row + 1][this.bike2Column] = "p";
          this.bike2Row += 1;
        }
      } else if (this.bike2Direction === "l") {
        if (secondMove === "l") {
          this.grid[this.bike2Row + 1][this.bike2Column] = "p";
          this.bike2Row += 1;
          this.bike2Direction = "d";
        } else if (secondMove === "r") {
          this.grid[this.bike2Row - 1][this.bike2Column] = "p";
          this.bike2Row -= 1;
          this.bike2Direction = "u";
        } else if (secondMove === "s") {
          this.grid[this.bike2Row][this.bike2Column - 1] = "p";
          this.bike2Column -= 1;
        }
      } else if (this.bike2Direction === "r") {
        if (secondMove === "l") {
          this.grid[this.bike2Row - 1][this.bike2Column] = "p";
          this.bike2Row -= 1;
          this.bike2Direction = "u";
        } else if (secondMove === "r") {
          this.grid[this.bike2Row + 1][this.bike2Column] = "p";
          this.bike2Row += 1;
          this.bike2Direction = "d";
        } else if (secondMove === "s") {
          this.grid[this.bike2Row][this.bike2Column + 1] = "p";
          this.bike2Column += 1;
        }
      }
    } else {
      this.bike2Dead = true;
    }
    if (this.bike1Dead && this.bike2Dead) this.gameOver = true;
  }

  returnWinner(g1, g2) {
    while (!this.gameOver) {
      let move1 = g1.nextMove(
        this.grid,
        new Bike(this.bike1Row, this.bike1Column),
        new Bike(this.bike2Row, this.bike2Column),
        this.bike1Direction
      );
      let move2 = g2.nextMove(
        this.grid,
        new Bike(this.bike2Row, this.bike2Column),
        new Bike(this.bike1Row, this.bike1Column),
        this.bike2Direction
      );
      this.makeMove(move1, move2);

      // render ur component (this.grid)
      // wait 0.3 seconds
    }
    g1.length = this.bike1Length;
    g2.length = this.bike2Length;
    let result = new Result(
      g1.length > g2.length ? g1 : g2,
      g2.length < g1.length ? g2 : g1
    );
    return result;
  }

  returnWinnerGrids(g1, g2) {
    while (!this.gameOver) {
      let move1 = g1.nextMove(
        this.grid,
        new Bike(this.bike1Row, this.bike1Column),
        new Bike(this.bike2Row, this.bike2Column),
        this.bike1Direction
      );
      let move2 = g2.nextMove(
        this.grid,
        new Bike(this.bike2Row, this.bike2Column),
        new Bike(this.bike1Row, this.bike1Column),
        this.bike2Direction
      );
      this.makeMove(move1, move2);
    }
    return this.grid;
  }
}

export { Genome, Bike, Tron };
