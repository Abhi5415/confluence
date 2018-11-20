import React from "react";
import SVG from "react-svg-draw";

const Tile = props => {
  let fill = "#FFFFFF";

  if (props.fill === "s") {
    fill = "#99C6ED";
  } else if (props.fill === "p") {
    fill = "#D6EAFB";
  } else if (props.fill === "w") {
    fill = "#FAFAFA";
  }

  return (
    <SVG.Rect
      x={`${props.x * (props.width / 17)}`}
      y={`${props.y * (props.width / 17)}`}
      width={`${props.width / 17}`}
      height={`${props.width / 17}`}
      style={{ fill }}
    />
  );
};

export default Tile;
