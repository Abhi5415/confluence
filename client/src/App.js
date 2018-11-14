import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";

import socketIOClient from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: "http://localhost:3000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("test", data => this.setState({ response: data }));
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <Button type="dashed">Connect to Server</Button>
      </div>
    );
  }
}
