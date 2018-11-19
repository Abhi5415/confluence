import React from 'react';
import SVG from 'react-svg-draw';
import GameDisplay from './GameDisplay';
import Delay from 'react-delay';
import { Bike, Tron, Genome } from "./Game";


const PlayGame = (props) => {
    let g1 = props.genome1;
    let g2 = props.genome2;
    let grid = [];
    let game = [];
    
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
      grid[s.row][s.col] = "p";
      grid[p.row][p.col] = "s";
    

    let t = new Tron();
    while(!t.gameOver) {
        let move1 = g1.nextMove(
            grid,
            new Bike(t.bike1Row, t.bike1Column),
            new Bike(t.bike2Row, t.bike2Column),
            this.bike1Direction
          );
          let move2 = g2.nextMove(
            this.grid,
            new Bike(t.bike2Row, t.bike2Column),
            new Bike(t.bike1Row, t.bike1Column),
            t.bike2Direction
          );
          t.makeMove(move1, move2);
            game.push(<Delay wait={250}><GameDisplay grid={grid} width={props.width}/></Delay>)
        g1.length = t.bike1Length;
        g2.length = t.bike2Length;
    }

    return(
        <div>
           {game.map((move) => move)}
        </div>
    )
} 

export default GameDisplay;


