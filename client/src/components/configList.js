import { List } from 'antd';
import configField from './configField';

const data = [
    <configField 
        feildName='Number of Genomes ' 
        format='' 
        defaultValue={1000}
    />, 
    <configField 
        feildName='Number of Generations ' 
        format='' 
        defaultValue={10}
    />,  
    <configField 
        feildName='Elitism ' 
        format='%' 
        defaultValue={35}
    />, 
    <configField 
        feildName='Rank of Top Elites ' 
        format='' 
        defaultValue={10}
    />,     
    <configField 
        feildName='Random Offspring ' 
        format='%'
        defaultValue={10}
    />, 
    <configField 
        feildName='Randomize Elites Percentage ' 
        format='' 
        defaultValue={30}
    />, 
    <configField 
        feildName='Randomness Bound ' 
        format='%' 
        defaultValue={30}
    />,   
];

function getValues(){
    // TODO
}

const configList = () => {
    return(
    <div>
        <h3 style={{ margin: '16px 0' }}>Constants Configuration</h3>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
    </div>
    )
}

export default configList;
