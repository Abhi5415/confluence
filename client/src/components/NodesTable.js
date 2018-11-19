import React from "react";
import { Table, Divider, Tag } from "antd";

const columns = [
  {
    title: "UUID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Browser",
    dataIndex: "browser",
    key: "browser"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: text => <Tag color="green">{text}</Tag>
  }
];

const NodesTable = ({ rawData }) => {
  let data = [];
  if (rawData == 0 || !rawData || rawData.length == 0) {
    data = [];
  } else {
    if (rawData) {
      console.log(rawData);
      data = rawData.map(raw => ({
        id: raw.id,
        browser: raw.userAgent.split(" ")[0],
        status: "Ready"
      }));
    }
  }
  return <Table columns={columns} dataSource={data} />;
};

export default NodesTable;
