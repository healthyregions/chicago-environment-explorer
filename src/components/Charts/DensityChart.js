import React, {useEffect, useState} from 'react';
import { AreaChart, Area,CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function BarChartComponent({data, dataKey, color}){
    const [yRange, setYRange] = useState([]);
    const densities = data.map((i) => i[dataKey]);
    const [min, max] = [Math.min(...densities), Math.max(...densities)];

    useEffect(() => {
        if (!yRange.length){
            setYRange([min, max])
        }
    }, [JSON.stringify(data)])  // eslint-disable-line react-hooks/exhaustive-deps
    const tickFormatter = f => Math.round(f*100)/100
    return (
      <ResponsiveContainer width="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
            <CartesianGrid horizontal={false}/>
          <XAxis dataKey="value" tickCount={5} padding={{ top: 0, bottom: 0, left:0, right:0 }} minTickGap={1} tickFormatter={tickFormatter}/>
          <YAxis dataKey="density" domain={yRange} ticks={[]} hide/>
          <defs>
            <linearGradient 
                id={`splitColor${color}`}
                x1="0" 
                y1="0" 
                x2="0"
                y2={`50px`}
                >
              <stop offset={yRange[0]} stopColor={color} />
              <stop offset={yRange[1]} stopColor={'gray'} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey={dataKey} stroke="#000" fill={`url(#splitColor${color})`} />
        </AreaChart>
      </ResponsiveContainer>
    );
}
