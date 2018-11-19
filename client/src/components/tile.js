import React from "react";

const tile = (props) => {
    let fill = '#FFFFFF';
    let border = '#F1F1F1';

    if(props.fill == 's'){
        fill = '#F9F0FF';
        border = '#D2AFF5';
    } else if (props.fill == 't') {
        fill = '#FFF2E8';
        border = '#FEBB99';
    } else if (props.fill == 'w') {
        border = '#000000';
    }

    return (
        <rect x={`${props.x*(props.width/17)}`} y={`${props.y*(props.width/17)}`} width={`${props.width/17}`} height={`${props.width/17}`}
        style={`fill:${fill};stroke:${border};stroke-width:${props.width/170};opacity:1`} />
    )

} 


