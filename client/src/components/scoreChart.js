import { ChartCard, MiniArea } from "ant-design-pro/lib/Charts";
import React from "react";

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
