import React, { Component } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Worker from "./pages/Worker";
import Admin from "./pages/Admin";
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    const endpoint = "http://192.168.5.1:3000";
    this.socket = io(endpoint);
    this.state = {
      usersOnline: 0,
      myProgress: 0
    };
  }

  execute() {
    this.socket.emit("execute");
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            path="/"
            exact
            render={() => <Worker socket={this.socket} />}
          />
          <Route
            path="/admin"
            render={() => (
              <Admin
                socket={this.socket}
                executeCallback={() => this.execute()}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
