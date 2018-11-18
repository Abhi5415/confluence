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
