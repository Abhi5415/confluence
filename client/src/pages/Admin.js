import React, { Component } from "react";
import { Input, Layout, Menu, Progress } from "antd";
import NodesTable from "../components/NodesTable";
import ParameterList from "../components/ParameterList";
import ScoreChart from "../components/ScoreChart";
import GameDisplay from "../components/GameDisplay";
import { Genome, Tron } from "../Game";
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

export default class Admin extends Component {
  constructor(props) {
    super(props);
    let g1 = new Genome();
    let g2 = new Genome();
    let t = new Tron();
    let grid = t.returnWinnerGrids(g1, g2);
    this.state = {
      clientIds: 0,
      executedButton: false,
      dataPoints: [],
      generation: 0,
      logs: [],
      grid,
      progressPercentage: 0
    };
    this.state.dataPoints.push(0);
  }

  componentWillMount() {
    const { socket } = this.props;
    socket.on("userUpdate", clientIds => {
      this.setState({
        clientIds
      });
      console.log(clientIds);
    });

    socket.on("dataPointsUpdate", dataPoints => {
      this.setState({
        dataPoints
      });
    });

    socket.on("currentGenerationProgressUpdate", progressPercentage => {
      this.setState({
        progressPercentage
      });
    });

    socket.on("logUpdate", logs => {
      this.setState({
        logs
      });
    });

    socket.on("genomeUpdate", genomes => {
      const { g1, g2 } = genomes;
      console.log(g1);
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

      let t = new Tron();
      let grid = t.returnWinnerGrids(fixedG1, fixedG2);
      this.setState({
        grid
      });
    });
  }

  formatData() {
    const { logs } = this.state;
    let str = "";
    for (let i = 0; i < logs.length; i++) {
      str += logs[i] + "\n";
    }
    return str;
  }

  render() {
    return (
      <Layout>
        {!this.state.executedButton ? (
          <div>
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item
                  key="3"
                  style={{ float: "right" }}
                  onClick={() => {
                    this.setState({ executedButton: true }, () =>
                      this.props.executeCallback()
                    );
                  }}
                >
                  Begin Training
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: "0 0px" }}>
              <Layout style={{ padding: "24px 24px", background: "#fff" }}>
                <Sider width={600} style={{ background: "#fff" }}>
                  <h1>Nodes Connected: {this.state.clientIds.length}</h1>
                  <NodesTable rawData={this.state.clientIds} />
                  <ParameterList />
                </Sider>
                <Content style={{ padding: "0 24px", minHeight: 280 }}>
                  <h1>Evaluation Function</h1>
                  <TextArea
                    rows={20}
                    placeholder={`const f = (x, y) => Math.sqrt(x * x + y * y);`}
                  />
                </Content>
              </Layout>
            </Content>
          </div>
        ) : (
          <div>
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}
              >
                <Progress
                  percent={this.state.progressPercentage}
                  style={{ width: 1330 }}
                />
              </Menu>
            </Header>
            <Content style={{ padding: "0 0px" }}>
              <Layout style={{ padding: "24px 24px", background: "#fff" }}>
                <Sider width={600} style={{ background: "#fff" }}>
                  <h1>Nodes Connected: {this.state.clientIds.length}</h1>
                  <NodesTable rawData={this.state.clientIds} />
                  <ScoreChart points={this.state.dataPoints} />
                </Sider>
                <Content style={{ padding: "0 24px", minHeight: 280 }}>
                  <h1>Current Simulation</h1>
                  <div
                    style={{
                      paddingLeft: 150
                    }}
                  >
                    <GameDisplay grid={this.state.grid} width={500} />
                  </div>
                  <h1>Console Logs</h1>
                  <TextArea
                    rows={20}
                    value={this.formatData()}
                    placeholder={`Loading...`}
                  />
                </Content>
              </Layout>
            </Content>
          </div>
        )}

        <Footer style={{ textAlign: "center" }}>
          Insert Sick Name Here 2018
        </Footer>
      </Layout>
    );
  }
}
