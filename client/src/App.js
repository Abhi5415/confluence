import React, { Component } from "react";
import "antd/dist/antd.css";
import { Button, Progress } from "antd";

import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    const endpoint = "http://localhost:3000";
    this.socket = io(endpoint);
    this.state = {
      usersOnline: 0,
      progress: 0
    };
  }

  compute = parcel => {
    console.log("received parcel", parcel);
    const fcn = eval(parcel.parcel.function);
    let computed = [];
    parcel.parcel.data.forEach(dataPoint => {
      computed.push(fcn(dataPoint.farRange));
    });
    this.socket.emit("doneWork", computed);
  };

  requestWork = () => {
    // console.log("requesting work");
    this.socket.emit("requestWork", 1000);
    this.socket.on("updateWorkStatus", parcel => this.compute(parcel));
  };

  componentDidMount() {
    this.socket.on("userUpdate", usersOnline => {
      this.setState({
        usersOnline
      });
    });
    this.socket.on("progressUpdate", progress => {
      this.setState({
        progress
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Users online: {this.state.usersOnline}</h1>
        <Button type="dashed" onClick={() => this.requestWork()}>
          Connect to Server
        </Button>
        <h3>Calculation Progress</h3>
        <Progress
          percent={this.state.progress}
          status={this.state.progress < 100 ? "active" : ""}
        />
      </div>
    );
  }
}
