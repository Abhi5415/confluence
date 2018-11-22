import React, { Component } from "react";
import { Input, Layout, Menu, Progress } from "antd";
import NodesTable from "../components/NodesTable";
import ParameterList from "../components/ParameterList";
import ScoreChart from "../components/ScoreChart";
import GameDisplay from "../components/GameDisplay";
import { Genome, Tron } from "../simulation/Game";

// Import UI elements
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

export default class Admin extends Component {
  constructor(props) {
    super(props);
    // make a grid to start with
    let g1 = new Genome();
    let g2 = new Genome();
    let t = new Tron();
    let grid = t.returnWinnerGrids(g1, g2);

    // set display sets to default values
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
    // update users
    socket.on("userUpdate", clientIds => {
      this.setState({
        clientIds
      });
    });
    // update data points
    socket.on("dataPointsUpdate", dataPoints => {
      this.setState({
        dataPoints
      });
    });
    // update current generation
    socket.on("currentGenerationProgressUpdate", progressPercentage => {
      this.setState({
        progressPercentage
      });
    });
    // update console log
    socket.on("logUpdate", logs => {
      this.setState({
        logs
      });
    });
    // update genomes
    socket.on("genomeUpdate", genomes => {
      const { g1, g2 } = genomes;
      let fixedG1 = new Genome();
      let fixedG2 = new Genome();

      // reassign genomes and variables
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

      // play game and set new grid
      let t = new Tron();
      let grid = t.returnWinnerGrids(fixedG1, fixedG2);
      this.setState({
        grid
      });
    });
  }

  formatData() {
    // formats data for console logs
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
        {/* Checks whether the user executed the program or not */}
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
                {/* Add execute callback to button click */}
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
                  {/* Print connected nodes and list of parameters */}
                  <h1>Nodes Connected: {this.state.clientIds.length}</h1>
                  <NodesTable rawData={this.state.clientIds} />
                  <ParameterList />
                </Sider>
                <Content style={{ padding: "0 24px", minHeight: 280 }}>
                  {/* Add input for function  */}
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
                {/* Percentage of generations completed */}
                <Progress
                  percent={this.state.progressPercentage}
                  style={{ width: 1330 }}
                />
              </Menu>
            </Header>
            <Content style={{ padding: "0 0px" }}>
              <Layout style={{ padding: "24px 24px", background: "#fff" }}>
                <Sider width={600} style={{ background: "#fff" }}>
                  {/* Show stats on nodes and graph of generations */}
                  <h1>Nodes Connected: {this.state.clientIds.length}</h1>
                  <NodesTable rawData={this.state.clientIds} />
                  <ScoreChart points={this.state.dataPoints} />
                </Sider>
                <Content style={{ padding: "0 24px", minHeight: 280 }}>
                  {/* Display current simulation and console logs */}
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

        <Footer style={{ textAlign: "center" }}>Confluence</Footer>
      </Layout>
    );
  }
}
