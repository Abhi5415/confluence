import React, { Component } from "react";
import { Row, Col, Input } from "antd";
import NodesTable from "../components/NodesTable";

const { TextArea } = Input;

export default class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {" "}
        <Col span={10}>
          <NodesTable />
        </Col>
        <Col span={14}>
          <div>
            <TextArea
              style={{ flex: 1 }}
              placeholder={`const f = (x, y) => Math.sqrt(x * x + y * y);`}
            />
          </div>
        </Col>
      </div>
    );
  }
}
