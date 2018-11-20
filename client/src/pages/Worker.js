import React, { Component } from "react";
import { Input, Layout, Menu, Progress, Row, Col, Tag } from "antd";
import { Tron, Genome } from "../Game";
import { runInThisContext } from "vm";
const { Header, Content, Footer, Sider } = Layout;

export default class Worker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Ready",
      clientIds: [],
      UUID: "Unassigned",
      tasks: 0,
      progressPercentage: 0
    };
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

    for (let i = 0; i + 1 < genomes.length; i += 2) {
      let r = this.playGame(genomes[i], genomes[i + 1]);
      computed.push(r.loser);
      computed.push(r.winner);
    }
    console.log(`Done ${computed.length} tasks.`);
    console.log("Emitting data");
    setTimeout(
      () => this.props.socket.emit("doneWork", computed),
      Math.random() * 5000
    );
    this.setState({
      status: "Ready",
      tasks: 0
    });
  }

  componentWillMount() {
    const { socket } = this.props;
    socket.on("userUpdate", clientIds => {
      this.setState({
        clientIds
      });
    });
    socket.on("currentGenerationProgressUpdate", progressPercentage => {
      this.setState({
        progressPercentage
      });
    });
    socket.on("assignWork", data => {
      this.setState({
        status: "Working",
        tasks: data.genomes.length
      });
      setTimeout(() => this.compute(data), 3000);
    });
    socket.on("updateUUID", UUID => this.setState({ UUID }));
  }

  render() {
    return (
      <Layout>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Progress
              percent={this.state.progressPercentage}
              style={{ width: 1320 }}
            />
          </Menu>
        </Header>

        <Content style={{ padding: "0 0px" }}>
          <Layout style={{ padding: "24px 24px", background: "#fff" }}>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <div style={{ textAlign: "center" }}>
                <h1>UUID: {this.state.UUID}</h1>
                <h1>Status: {this.state.status}</h1>
                <h1>Workers Online: {this.state.clientIds.length}</h1>
                <h1>Tasks: {this.state.tasks}</h1>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
