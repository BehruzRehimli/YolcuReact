


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const Example = () => {

    const [data, setData] = useState([
        {
            name: 'Iyul',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Avqust',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Sentyabr',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Oktyabr',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Noyabr',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Dekabr',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ])

    const [total,setTotal]=useState({
        count:0,
        carPrice:0,
        price:0
    })

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://bexarehimli-001-site1.htempurl.com/api/Rents/GetForCharts").then(res => {
            var datas = res.data;
            console.log(datas);
            setData([
                {
                    name: 'Iyul',
                    uv: datas.julyCar + datas.julyExt,
                    pv: datas.julyCar,
                    amt: 2210,
                },
                {
                    name: 'Avqust',
                    uv: datas.avqCar + datas.avqExt,
                    pv: datas.avqCar,
                    amt: 2290,
                },
                {
                    name: 'Sentyabr',
                    uv: datas.senCar + datas.senExt,
                    pv: datas.senCar,
                    amt: 2000,
                },
                {
                    name: 'Oktyabr',
                    uv: datas.oktCar + datas.oktExt,
                    pv: datas.oktCar,
                    amt: 2181,
                },
                {
                    name: 'Noyabr',
                    uv: datas.novCar + datas.novExt,
                    pv: datas.novCar,
                    amt: 2500,
                },
                {
                    name: 'Dekabr',
                    uv: datas.decCar + datas.decExt,
                    pv: datas.decCar,
                    amt: 2100,
                },
            ])
            setTotal({
                count:datas.count,
                carPrice:datas.totalCar,
                price:datas.total
            })
        }).catch(error => navigate("/error"))
    }, [])
    return (
        <div className="card oh">
            <div className="card-body">
                <div className="d-flex m-b-30 align-items-center no-block">
                    <h5 className="card-title ">Monthly Sales</h5>
                    <div className="ml-auto">
                        <ul className="list-inline font-12">
                            <li><i className="fa fa-circle text-primary"></i> Sum Price of Rents</li>
                        </ul>
                    </div>
                </div>
                <div id="morris-area-chart" style={{ height: "350px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" stackId="a" fill="#ffa900" />
                            <Bar dataKey="uv" stackId="a" fill="#ffa90030" />
                        </BarChart>
                    </ResponsiveContainer>


                </div>
            </div>
            <div className="card-body bg-light">
                <div className="row text-center m-b-20">
                    <div className="col-lg-4 col-md-4 m-t-20">
                        <h2 className="m-b-0 font-light">{total.count}</h2><span className="text-muted">Rents Count</span>
                    </div>
                    <div className="col-lg-4 col-md-4 m-t-20">
                        <h2 className="m-b-0 font-light">{total.carPrice} $</h2><span className="text-muted">Car Price</span>
                    </div>
                    <div className="col-lg-4 col-md-4 m-t-20">
                        <h2 className="m-b-0 font-light">{total.price} $</h2><span className="text-muted">Total Price</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Example;
