import React, { Component } from "react";
import { Row, Col, Input, Layout, Menu, Breadcrumb, Icon } from "antd";
import NodesTable from "../components/NodesTable";
import ParameterList from "../components/ParameterList";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { TextArea } = Input;

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientIds: 0,
      executedButton: false
    };
  }

  componentWillMount() {
    const { socket } = this.props;
    socket.on("userUpdate", clientIds => {
      this.setState({
        clientIds
      });
      console.log(clientIds);
    });
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
          <h1>Test</h1>
        )}

        <Footer style={{ textAlign: "center" }}>
          Insert Sick Name Here 2018
        </Footer>
      </Layout>
    );
  }
}
