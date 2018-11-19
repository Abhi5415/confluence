import React, { Component } from "react";
import { Bar } from "ant-design-pro/lib/Charts";

const ScoreChart = ({ points }) => {
  const evolutionData = [];

  function addData(points) {
    points.forEach(point => {
      evolutionData.push({
        x: `gen. ${point}`,
        y: points[point]
      });
    });
  }

  return <Bar height={200} title="Score Per Generation" data={evolutionData} />;
};

export default ScoreChart;
