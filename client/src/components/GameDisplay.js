import React from "react";
import SVG from "react-svg-draw";
import Tile from './tile.js'

const GameDisplay = (props) => {
    
    let tiles = []
    for (let i = 0; i < 17; i++ ){
        for (let j = 0; j < 17; j++ ){
            tiles.push(<Tile width={props.width} fill={props.grid[i][j]} x={j} y={i}/>)
        }
    }
    
    return(
        <div>
            <SVG width={props.width} height={props.width}>
                {tiles.map((tile) => tile)}
            </SVG>
        </div>
    )
} 

export default GameDisplay;