import React from "react";

const GameDisplay = (props) => {
    
    tiles = []
    const populateSVG = (props) => {
        for (i = 0; i < 17; i++ ){
            for (j = 0; j < 17; j++ ){
                tiles.push(<tile width={props.width} fill={props.grid[i][j]}/>)
            }
        }
    }

    return(
        <svg width={props.width} height={props.height}>
            {tiles.map((tile) => tile)}
        </svg>
    )
} 
