import React from 'react';
import SVG from 'react-svg-draw';
import GameDisplay from './GameDisplay';
import Delay from 'react-delay';
import { Bike, Tron, Genome } from "./../Game";


export default class PlayGame extends React.Component {
    constructor(props) {
        super(props);

        let grid = [];
        for (let i = 0; i < 17; i++) {
            let g = [];
            for (let j = 0; j < 17; j++) g.push('.');
            grid.push(g);
        }

        this.state = {
            gridLog: [grid],
            currentGrid: grid,
        }

    }

    componentDidMount() {
        let g1 = this.props.g1;
        let g2 = this.props.g2;

        let t = new Tron();
        console.log(t.grid);
        let grid = [];
        for (let i = 0; i < 17; i++) {
            let g = [];
            for (let j = 0; j < 17; j++) g.push('.');
            grid.push(g);
        }
    
        for (let i = 0; i < 17; i++) {
            grid[0][i] = "w";
            grid[i][0] = "w";
            grid[16][i] = "w";
            grid[i][16] = "w";
          }

          console.log(t.grid);
          t.grid = grid;
          console.log(t.grid);


    while (!t.gameOver) {
        let move1 = g1.nextMove(
            t.grid,
            new Bike(t.bike1Row, t.bike1Column),
            new Bike(t.bike2Row, t.bike2Column),
            t.bike1Direction
        );
        let move2 = g2.nextMove(
            t.grid,
            new Bike(t.bike2Row, t.bike2Column),
            new Bike(t.bike1Row, t.bike1Column),
            t.bike2Direction
        );
        t.makeMove(move1, move2);
        this.state.gridLog.push(t.grid.slice());
        g1.length = t.bike1Length;
        g2.length = t.bike2Length;
    }

    // this.startDisplaying();
}

startDisplaying() {
    let next = this.state.gridLog[0];
    if (this.state.gridLog && this.state.gridLog.length > 0) {
        setInterval(() => {
            this.setState({
                currentGrid: next,
            })
            if (this.state.gridLog && this.state.gridLog.length > 0) {
                this.state.gridLog.shift();
                next = this.state.gridLog[0];
                console.log(this.state.currentGrid);
            }
        }, 5000)
    }
}

render() {
    return(
        <div>
           <GameDisplay grid={this.state.currentGrid} width={this.props.width}/>
        </div>
    )
}
} 

