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

  compute = parcel => {
    console.log("received parcel", parcel);
    const fcn = eval(parcel.parcel.function);
    console.log(fcn(1901));
  };

  requestWork = () => {
    // console.log("requesting work");
    this.socket.emit("requestWork", 1000);
    this.socket.on("updateWorkStatus", parcel => this.compute(parcel));
  };

  componentDidMount() {}

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
