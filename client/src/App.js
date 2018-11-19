import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Progress } from "antd";
import { Tron, Genome } from "./Game";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Worker from "./pages/Worker";
import Admin from "./pages/Admin";

import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    const endpoint = "http://localhost:3000";
    this.socket = io(endpoint);
    this.state = {
      usersOnline: 0,
      myProgress: 0,
      currentGenerationProgress: 0
    };
  }

  execute() {
    console.log("Executing");
    this.socket.emit("execute");
  }

  playGame(g1, g2) {
    let fixedG1 = new Genome();
    let fixedG2 = new Genome();

    fixedG1.loseFreespace = g1.loseFreespace;
    fixedG1.closeWallDistance = g1.closeWallDistance;
    fixedG1.closeRelativeEnemyX = g1.closeRelativeEnemyX;
    fixedG1.closeRelativeEnemyY = g1.closeRelativeEnemyY;
    fixedG1.farFreespace = g1.farFreespace;
    fixedG1.farWallDistance = g1.farWallDistance;
    fixedG1.farRelativeEnemyX = g1.farRelativeEnemyX;
    fixedG1.farRelativeEnemyY = g1.farRelativeEnemyY;
    fixedG1.currDirection = g1.currDirection;
    fixedG1.didWin = false;
    fixedG1.length = 0;
    fixedG1.farDFS = g1.farDFS;
    fixedG1.closeDFS = g1.closeDFS;

    fixedG2.loseFreespace = g2.loseFreespace;
    fixedG2.closeWallDistance = g2.closeWallDistance;
    fixedG2.closeRelativeEnemyX = g2.closeRelativeEnemyX;
    fixedG2.closeRelativeEnemyY = g2.closeRelativeEnemyY;
    fixedG2.farFreespace = g2.farFreespace;
    fixedG2.farWallDistance = g2.farWallDistance;
    fixedG2.farRelativeEnemyX = g2.farRelativeEnemyX;
    fixedG2.farRelativeEnemyY = g2.farRelativeEnemyY;
    fixedG2.currDirection = g2.currDirection;
    fixedG2.didWin = false;
    fixedG2.length = 0;
    fixedG2.farDFS = g2.farDFS;
    fixedG2.closeDFS = g2.closeDFS;

    let tron = new Tron();
    return tron.returnWinner(fixedG1, fixedG2);
  }

  compute(data) {
    const { genomes } = data;
    let computed = [];

    for (let i = 0; i < genomes.length; i += 2) {
      let r = this.playGame(genomes[i], genomes[i + 1]);
      computed.push(r.loser);
      computed.push(r.winner);
    }
    console.log(`Done ${computed.length} tasks.`);
    console.log("Emitting data");
    setTimeout(
      () => this.socket.emit("doneWork", computed),
      Math.random() * 5000
    );
  }

  componentDidMount() {
    this.socket.on(
      "currentGenerationProgressUpdate",
      currentGenerationProgress => {
        this.setState({
          currentGenerationProgress
        });
      }
    );

    this.socket.on("assignWork", data => this.compute(data));
  }

  render() {
    const { currentGenerationProgress } = this.state;
    const done = currentGenerationProgress > 97;
    return (
      <Router>
        <div>
          <Route path="/" exact component={Worker} />
          <Route
            path="/admin"
            render={() => (
              <Admin
                socket={this.socket}
                executeCallback={() => this.execute()}
              />
            )}
          />
          {/* <h1>Users online: {this.state.usersOnline}</h1>
        <Button type="dashed" onClick={() => this.execute()}>
          Execute Task
        </Button>
        <Progress percent={this.state.myProgress} />
        <Progress percent={done ? 100 : currentGenerationProgress} /> */}
        </div>
      </Router>
    );
  }
}
