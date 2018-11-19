
import React, { Component } from "react";
import { Input } from 'antd';
const { TextArea } = Input;

const evalFunction = () => {
    return(
    <div>
        <h3 style={{ margin: '16px 0' }}>Evaluation Function</h3>
        <TextArea rows={4} />
    </div>
    )
}

export default evalFunction;

