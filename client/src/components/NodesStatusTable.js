import React from "react";
import { Table, Divider, Tag } from "antd";

const columns = [
  {
    title: "Device ID",
    dataIndex: "deviceId",
    key: "deviceId",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Device Type",
    dataIndex: "deviceType",
    key: "deviceType"
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: status => (
      <span>
        {<Tag color={tagColour(status)} key={status}>{status}</Tag>}
      </span>
    ),
  }
];

tagColour = (status) => {
  switch (status){
    case 'Done':
      return 'blue';
      break;
    case 'Ready':
      return 'cyan';
      break;
    case 'Processing':
      return 'orange';
      break;
  }
}



const data = [];
function pushData(id, deviceType, status) {
  id.forEach(id =>
    data.push({ id: id[id], deviceType: deviceType[id], status: status[id]})
  );
}

const NodesTable = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default NodesTable;
