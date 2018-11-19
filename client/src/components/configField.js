import { InputNumber } from 'antd';


const configField = (props) => {
  if (props.format == '%'){
    return(
      <div> 
        <h3>{props.fieldName}</h3>
        <InputNumber
        defaultValue={100}
        min={0}
        max={100}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
        />
      </div>
      
    )
  } else {
    return(
      <div> 
        <h3>{props.fieldName}</h3>
        <InputNumber min={0} max={100000000000000} defaultValue={props.defaultValue} />
      </div>
    )
  }
}

export default configField;