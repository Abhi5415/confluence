import React, { Component } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameDisplay from './components/GameDisplay';
import io from "socket.io-client";

import { Genome, Tron } from './Game';

export default class App extends Component {
  constructor(props) {
    super(props);
    const endpoint = "http://localhost:3000";
    this.socket = io(endpoint);
    this.state = {
      usersOnline: 0,
      myProgress: 0
    };
  }

  execute() {
    this.socket.emit("execute");
  }

  render() {
    let g1 = new Genome();
    let g2 = new Genome();
    let t = new Tron();
    let grid = t.returnWinnerGrids(g1, g2);

    console.log(grid);
    return (
      <Router>
        <GameDisplay grid={grid} width={500}/>
{/*         
        <div>
          <Route
            path="/"
            exact
            render={() => <Worker socket={this.socket} />}
          />
          <Route
            path="/admin"
            render={() => (
              <Admin
                socket={this.socket}
                executeCallback={() => this.execute()}
              />
            )}
          />
        </div> */}
      </Router>
    );
  }
}
