import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";

import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    const endpoint = "http://localhost:3000";
    this.socket = io(endpoint);
  }

  requestWork = () => {
    this.socket.emit("work", 1000);
  };

  componentDidMount() {
    console.log("Requesting some work");
    console.log(this.socket);
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <Button type="dashed" onClick={() => this.requestWork()}>
          Connect to Server
        </Button>
      </div>
    );
  }
}
