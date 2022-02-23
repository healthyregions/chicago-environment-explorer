import React, {useState} from 'react';
import { BarChart, Bar, LabelList, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function BarChartComponent({data, dataKey, color, x, y, stroke, value, index}){
    const [hoverVal, setHoverVal] = useState(null);

    const renderLabel = ({x, y, stroke, value, index}) => {
        return <text style={{transition:'125ms all'}} x={x+4} y={y} dy={-4} textAnchor='right' fill={index === hoverVal ? stroke : 'none'} >{value}</text>
    };

    const handleHover = (e) => setHoverVal(e.binNumber);
    const resetHover = () => setHoverVal(null);
    
    return (
      <ResponsiveContainer width="100%">
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 0,
                right: 10,
                left: 0,
                bottom: 0,
            }}
            barSize={300}
        >
            <CartesianGrid horizontal={false}/>
            <Bar 
                dataKey={dataKey} 
                stroke={color}
                strokeWidth={1}
                fill={'rgb(200,200,200)'}
                onMouseOver={handleHover}
                onMouseOut={resetHover}
            >
                <LabelList dataKey={dataKey}  content={renderLabel}/>
            </Bar>
            <XAxis dataKey={'min'} tickLine={false} tickFormatter={x => x.toFixed(2)} minTickGap={-5}/>
            {/* <YAxis dataKey={'count'} label={{ value: "count", angle: -90, position: 'insideLeft' }} /> */}
        </BarChart>
      </ResponsiveContainer>
    );
}
