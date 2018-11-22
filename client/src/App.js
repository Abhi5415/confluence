import React, { Component } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// socketio
import io from "socket.io-client";

// import pages
import Worker from "./pages/Worker";
import Admin from "./pages/Admin";

export default class App extends Component {
  constructor(props) {
    // config socket and stats
    super(props);
    const endpoint = "http://192.168.5.1:3000";
    this.socket = io(endpoint);
  }

  execute() {
    // execute function call for work on the server
    this.socket.emit("execute");
  }

  render() {
    return (
      <Router>
        <div>
          {/* Path to the Worker route */}
          <Route
            path="/"
            exact
            render={() => <Worker socket={this.socket} />}
          />
          {/* Path to the Admin route */}
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
