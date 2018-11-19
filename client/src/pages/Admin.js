import React, { Component } from "react";
import { Input, Layout, Menu, Progress } from "antd";
import NodesTable from "../components/NodesTable";
import ParameterList from "../components/ParameterList";
import ScoreChart from "../components/ScoreChart";
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientIds: 0,
      executedButton: false,
      dataPoints: [],
      generation: 0,
      logs: [],
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
                  <h1>Simulation</h1>

                  <h1>Console Logs</h1>
                  <TextArea
                    rows={20}
                    value={this.formatData()}
                    placeholder={`const f = (x, y) => Math.sqrt(x * x + y * y);`}
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
