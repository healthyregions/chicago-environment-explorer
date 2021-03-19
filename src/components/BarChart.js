import React, {useState} from 'react';
import { BarChart, Bar, LabelList, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChartComponent(props){
    const [hoverVal, setHoverVal] = useState(null);

    const renderLabel = (props) => {
        const {x, y, stroke, value, index} = props;	
        return <text style={{transition:'125ms all'}} x={x+4} y={y} dy={-4} textAnchor='right' fill={index === hoverVal ? stroke : 'none'} >{value}</text>
    };

    const handleHover = (e) => setHoverVal(e.binNumber);
    const resetHover = () => setHoverVal(null);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
            width={500}
            height={300}
            data={props.data}
            margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 0,
            }}
            barSize={300}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <Bar 
                dataKey={props.dataKey} 
                fill={props.color}
                onMouseOver={handleHover}
                onMouseOut={resetHover}
            >
                <LabelList dataKey={props.dataKey}  content={renderLabel}/>
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
}
