import {
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress
} from "ant-design-pro/lib/Charts";
import React, { Component } from "react";
import { Bar, Icon, Tooltip } from "ant-design-pro/lib/Charts";
import Trend from "ant-design-pro/lib/Trend";
import NumberInfo from "ant-design-pro/lib/NumberInfo";
import numeral from "numeral";
import moment from "moment";

// const visitData = [];
// const beginDay = new Date().getTime();
// for (let i = 0; i < 20; i += 1) {
//   visitData.push({
//     x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
//       "YYYY-MM-DD"
//     ),
//     y: Math.floor(Math.random() * 100) + 10
//   });
// }

const ScoreChart = ({ points }) => {
  let max = -1;
  let visitData = [];
  visitData = points.map((point, i) => {
    if (point > max) max = point;
    return {
      x: i,
      y: point
    };
  });

  return (
    <ChartCard
      title="Length vs Generation"
      total={`Peak: ${max}`}
      contentHeight={max + 60}
    >
      <MiniArea line height={max} data={visitData} />
    </ChartCard>
  );
};

export default ScoreChart;
