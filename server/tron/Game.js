const RANDOM_LOWER_BOUND = -10;
const RANDOM_UPPER_BOUND = 10;
const PENALTY = -500;
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
        to_push(false);
      }
      this.visited.push(to_push);
    }
    this.counter = 0;
    this.start = start;
  }

  dfs() {
    dfs_driver(start);
    return counter;
  }

  dfs_driver(graph, start) {
    if (start.row < 1 || start.col < 1 || start.row >= 16 || start.col >= 17)
      return;
    if (visited[start.row][start.col]) return;
    let c = graph[start.row][start.col];

    if (c != ".") return;
    counter++;

    visited[start.row][start.col] = true;

    dfs(graph, new Bike(start.row - 1, start.col));
    dfs(graph, new Bike(start.row + 1, start.col));
    dfs(graph, new Bike(start.row, start.col - 1));
    dfs(graph, new Bike(start.row, start.col + 1));
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
      this.closeRelativeEnemyX = new double[3]();
      this.closeRelativeEnemyX[0] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.closeRelativeEnemyX[1] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.closeRelativeEnemyX[2] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.closeRelativeEnemyY = new double[3]();
      this.closeRelativeEnemyY[0] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.closeRelativeEnemyY[1] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.closeRelativeEnemyY[2] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.farFreespace = this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
      this.farWallDistance = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.farRelativeEnemyX = new double[3]();
      this.farRelativeEnemyX[0] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.farRelativeEnemyX[1] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.farRelativeEnemyX[2] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.farRelativeEnemyY = new double[3]();
      this.farRelativeEnemyY[0] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.farRelativeEnemyY[1] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.farRelativeEnemyY[2] = this.random(
        RANDOM_LOWER_BOUND,
        RANDOM_UPPER_BOUND
      );
      this.currDirection = "u";
      this.didWin = false;
      this.length = 0;
      this.farDFS = this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
      this.closeDFS = this.random(RANDOM_LOWER_BOUND, RANDOM_UPPER_BOUND);
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
        Math.pow(relativeX(myPosition, enemyPosition), 2) +
          Math.pow(relativeY(myPosition, enemyPosition), 2)
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
    }

    if (isFar) {
      ratingS +=
        distanceToNearestObstacle(grid, myPosition, currentDirection) *
        farWallDistance;
      ratingL +=
        distanceToNearestObstacle(grid, myPosition, moveL) * farWallDistance;
      ratingR +=
        distanceToNearestObstacle(grid, myPosition, moveR) * farWallDistance;
      ratingS += freeSpacesAtIndex(grid, bikeS) * farFreespace;
      ratingL += freeSpacesAtIndex(grid, bikeL) * farFreespace;
      ratingR += freeSpacesAtIndex(grid, bikeR) * farFreespace;
      ratingS += relativeX(bikeS, enemyPosition) * farRelativeEnemyX[0];
      ratingL += relativeX(bikeL, enemyPosition) * farRelativeEnemyX[1];
      ratingR += relativeX(bikeR, enemyPosition) * farRelativeEnemyX[2];
      ratingS += relativeY(bikeS, enemyPosition) * farRelativeEnemyY[0];
      ratingL += relativeY(bikeL, enemyPosition) * farRelativeEnemyY[1];
      ratingR += relativeY(bikeR, enemyPosition) * farRelativeEnemyY[2];
      ratingS += DFS(bikeS, grid) * farDFS;
      ratingL += DFS(bikeL, grid) * farDFS;
      ratingR += DFS(bikeR, grid) * farDFS;
    } else {
      ratingS +=
        distanceToNearestObstacle(grid, myPosition, currentDirection) *
        closeWallDistance;
      ratingL +=
        distanceToNearestObstacle(grid, myPosition, moveL) * closeWallDistance;
      ratingR +=
        distanceToNearestObstacle(grid, myPosition, moveR) * closeWallDistance;
      ratingS += freeSpacesAtIndex(grid, bikeS) * closeFreespace;
      ratingL += freeSpacesAtIndex(grid, bikeL) * closeFreespace;
      ratingR += freeSpacesAtIndex(grid, bikeR) * closeFreespace;
      ratingS += relativeX(bikeS, enemyPosition) * closeRelativeEnemyX[0];
      ratingL += relativeX(bikeL, enemyPosition) * closeRelativeEnemyX[1];
      ratingR += relativeX(bikeR, enemyPosition) * closeRelativeEnemyX[2];
      ratingS += relativeY(bikeS, enemyPosition) * closeRelativeEnemyY[0];
      ratingL += relativeY(bikeL, enemyPosition) * closeRelativeEnemyY[1];
      ratingR += relativeY(bikeR, enemyPosition) * closeRelativeEnemyY[2];
      ratingS += DFS(bikeS, grid) * closeDFS;
      ratingL += DFS(bikeL, grid) * closeDFS;
      ratingR += DFS(bikeR, grid) * closeDFS;
    }

    if (!isValidMove(bikeS, grid)) ratingS -= 200;
    if (!isValidMove(bikeL, grid)) ratingL -= 200;
    if (!isValidMove(bikeR, grid)) ratingR -= 200;

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

    return grid[r][c] == ".";
  }

  distanceToNearestObstacle(state, curr, direction) {
    switch (direction) {
      case "u":
        for (var i = curr.row - 1; i >= 0; i--) {
          if (state[i][curr.col] != ".") {
            return Math.abs(curr.row - i - 1);
          }
        }
      case "d":
        for (var i = curr.row + 1; i < state.length; i++) {
          if (state[i][curr.col] != ".") {
            return Math.abs(i - curr.row - 1);
          }
        }
      case "l":
        for (var i = curr.col - 1; i >= 0; i--) {
          if (state[curr.row][i] != ".") {
            return Math.abs(curr.col - i - 1);
          }
        }
      case "r":
        for (var i = curr.col + 1; i < state[0].length; i++) {
          if (state[curr.row][i] != ".") {
            return Math.abs(i - curr.col - 1);
          }
        }
      default:
        return -1;
    }
  }

  freeSpacesAtIndex(state, b) {
    let x = b.row;
    let y = b.col;

    res = 0;

    for (let r = x - 2; r < x + 3; r++) {
      for (let c = y - 2; c < y + 3; c++) {
        // validate bounds
        if (r < 0 || r >= state.length || c < 0 || c >= state.length) continue;

        if (state[r][c] == ".") res++;
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
    setGrid();
    this.grid = [];
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
  }

  setGrid() {
    for (var i = 0; i < 17; i++) {
      let to_push = [];
      for (var j = 0; j < 17; j++) {
        to_push.push(".");
      }
      this.grid.push(to_push);
    }
    grid = new char[17][17]();
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        grid[i][j] = ".";
      }
    }
    for (var i = 0; i < 17; i++) {
      grid[0][i] = "w";
      grid[i][0] = "w";
      grid[16][i] = "w";
      grid[i][16] = "w";
    }
    let s = new Bike(8, 14);
    let p = new Bike(8, 2);
    grid[s.row][s.col] = "p";
    grid[p.row][p.col] = "s";
  }

  isValidMove(row, column, move, direction, grid) {
    if (direction == "u") {
      if (move == "l") {
        if (grid[row][column - 1] != ".") {
          return false;
        }
      } else if (move == "r") {
        if (grid[row][column + 1] != ".") {
          return false;
        }
      } else if (move == "s") {
        if (grid[row - 1][column] != ".") {
          return false;
        }
      }
    } else if (direction == "d") {
      if (move == "l") {
        if (grid[row][column + 1] != ".") {
          return false;
        }
      } else if (move == "r") {
        if (grid[row][column - 1] != ".") {
          return false;
        }
      } else if (move == "s") {
        if (grid[row + 1][column] != ".") {
          return false;
        }
      }
    } else if (direction == "l") {
      if (move == "l") {
        if (grid[row + 1][column] != ".") {
          return false;
        }
      } else if (move == "r") {
        if (grid[row - 1][column] != ".") {
          return false;
        }
      } else if (move == "s") {
        if (grid[row][column - 1] != ".") {
          return false;
        }
      }
    } else if (direction == "r") {
      if (move == "l") {
        if (grid[row - 1][column] != ".") {
          return false;
        }
      } else if (move == "r") {
        if (grid[row + 1][column] != ".") {
          return false;
        }
      } else if (move == "s") {
        if (grid[row][column + 1] != ".") {
          return false;
        }
      }
    }
    return true;
  }

  printGrid(grid) {
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        System.out.print(" " + grid[i][j] + " ");
      }
      System.out.println();
    }
  }

  makeMove(firstMove, secondMove) {
    if (
      !bike1Dead &&
      isValidMove(bike1Row, bike1Column, firstMove, bike1Direction, grid)
    ) {
      bike1Length++;
      if (bike1Direction == "u") {
        if (firstMove == "l") {
          grid[bike1Row][bike1Column - 1] = "s";
          bike1Column -= 1;
          bike1Direction = "l";
        } else if (firstMove == "r") {
          grid[bike1Row][bike1Column + 1] = "s";
          bike1Column += 1;
          bike1Direction = "r";
        } else if (firstMove == "s") {
          grid[bike1Row - 1][bike1Column] = "s";
          bike1Row -= 1;
        }
      } else if (bike1Direction == "d") {
        if (firstMove == "l") {
          grid[bike1Row][bike1Column + 1] = "s";
          bike1Column += 1;
          bike1Direction = "r";
        } else if (firstMove == "r") {
          grid[bike1Row][bike1Column - 1] = "s";
          bike1Column -= 1;
          bike1Direction = "l";
        } else if (firstMove == "s") {
          grid[bike1Row + 1][bike1Column] = "s";
          bike1Row += 1;
        }
      } else if (bike1Direction == "l") {
        if (firstMove == "l") {
          grid[bike1Row + 1][bike1Column] = "s";
          bike1Row += 1;
          bike1Direction = "d";
        } else if (firstMove == "r") {
          grid[bike1Row - 1][bike1Column] = "s";
          bike1Row -= 1;
          bike1Direction = "u";
        } else if (firstMove == "s") {
          grid[bike1Row][bike1Column - 1] = "s";
          bike1Column -= 1;
        }
      } else if (bike1Direction == "r") {
        if (firstMove == "l") {
          grid[bike1Row - 1][bike1Column] = "s";
          bike1Row -= 1;
          bike1Direction = "u";
        } else if (firstMove == "r") {
          grid[bike1Row + 1][bike1Column] = "s";
          bike1Row += 1;
          bike1Direction = "d";
        } else if (firstMove == "s") {
          grid[bike1Row][bike1Column + 1] = "s";
          bike1Column += 1;
        }
      }
    } else {
      bike1Dead = true;
    }

    if (
      !bike2Dead &&
      isValidMove(bike2Row, bike2Column, secondMove, bike2Direction, grid)
    ) {
      bike2Length++;
      if (bike2Direction == "u") {
        if (secondMove == "l") {
          grid[bike2Row][bike2Column - 1] = "p";
          bike2Column -= 1;
          bike2Direction = "l";
        } else if (secondMove == "r") {
          grid[bike2Row][bike2Column + 1] = "p";
          bike2Column += 1;
          bike2Direction = "r";
        } else if (secondMove == "s") {
          grid[bike2Row - 1][bike2Column] = "p";
          bike2Row -= 1;
        }
      } else if (bike2Direction == "d") {
        if (secondMove == "l") {
          grid[bike2Row][bike2Column + 1] = "p";
          bike2Column += 1;
          bike2Direction = "r";
        } else if (secondMove == "r") {
          grid[bike2Row][bike2Column - 1] = "p";
          bike2Column -= 1;
          bike2Direction = "l";
        } else if (secondMove == "s") {
          grid[bike2Row + 1][bike2Column] = "p";
          bike2Row += 1;
        }
      } else if (bike2Direction == "l") {
        if (secondMove == "l") {
          grid[bike2Row + 1][bike2Column] = "p";
          bike2Row += 1;
          bike2Direction = "d";
        } else if (secondMove == "r") {
          grid[bike2Row - 1][bike2Column] = "p";
          bike2Row -= 1;
          bike2Direction = "u";
        } else if (secondMove == "s") {
          grid[bike2Row][bike2Column - 1] = "p";
          bike2Column -= 1;
        }
      } else if (bike2Direction == "r") {
        if (secondMove == "l") {
          grid[bike2Row - 1][bike2Column] = "p";
          bike2Row -= 1;
          bike2Direction = "u";
        } else if (secondMove == "r") {
          grid[bike2Row + 1][bike2Column] = "p";
          bike2Row += 1;
          bike2Direction = "d";
        } else if (secondMove == "s") {
          grid[bike2Row][bike2Column + 1] = "p";
          bike2Column += 1;
        }
      }
    } else {
      bike2Dead = true;
    }
    if (bike1Dead && bike2Dead) gameOver = true;
  }

  returnWinner(g1, g2) {
    while (!gameOver) {
      let move1 = g1.nextMove(
        grid,
        new Bike(bike1Row, bike1Column),
        new Bike(bike2Row, bike2Column),
        bike1Direction
      );
      let move2 = g2.nextMove(
        grid,
        new Bike(bike2Row, bike2Column),
        new Bike(bike1Row, bike1Column),
        bike2Direction
      );
      makeMove(move1, move2);
    }
    g1.length = bike1Length;
    g2.length = bike2Length;
    let result = new Result(
      g1.length > g2.length ? g1 : g2,
      g2.length < g1.length ? g2 : g1
    );
    return result;
  }

  returnWinnerVerbose(g1, g2) {
    while (!gameOver) {
      let move1 = g1.nextMove(
        grid,
        new Bike(bike1Row, bike1Column),
        new Bike(bike2Row, bike2Column),
        bike1Direction
      );
      let move2 = g2.nextMove(
        grid,
        new Bike(bike2Row, bike2Column),
        new Bike(bike1Row, bike1Column),
        bike2Direction
      );
      makeMove(move1, move2);
      printGrid(grid);
    }

    g1.length = bike1Length;
    g2.length = bike2Length;
    result = new Result(
      g1.length > g2.length ? g1 : g2,
      g2.length < g1.length ? g2 : g1
    );
    return result;
  }
}

new Genome();
