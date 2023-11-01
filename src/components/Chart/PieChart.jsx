import React, { PureComponent, useState } from 'react';
import { useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import axios from 'axios';


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';




    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#ffa900"}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"#ffa900"}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={"#ffa900"}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"#ffa900"} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={"#ffa900"} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#ffa900">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#ffa900">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

function Example() {
    const [data, setData] = useState([
        { name: 'Accepted', value: 500 },
        { name: 'Rejected', value: 300 },
        { name: 'Pending', value: 300 },
    ]);


    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        axios.get("http://bexarehimli-001-site1.htempurl.com/api/Rents/PieChart").then(res => {
            setData([
                { name: 'Accepted', value: res.data.accept },
                { name: 'Rejected', value: res.data.rejected },
                { name: 'Pending', value: res.data.pending },
            ])
        })
    }, [])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
export default Example;
