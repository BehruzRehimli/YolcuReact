import React from 'react'
import User1 from "../../images/images/users/1.jpg"
import User2 from "../../images/images/users/2.jpg"
import User3 from "../../images/images/users/3.jpg"
import User4 from "../../images/images/users/4.jpg"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import Chart from '../../components/Chart/Chart'
import { data } from 'jquery'
import PieChart from "../../components/Chart/PieChart"


const Dashboard = () => {

    const navigate = useNavigate();

    const { adminToken } = useSelector(store => store.login)



    useEffect(() => {
        const getCountries = async () => {
            var token = "Bearer " + adminToken
            try {
                var datas = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/types`, { headers: { "Authorization": token } })
            } catch (error) {
                if (error.response.status == 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")
                }
            }
        }
        getCountries();
    }, [])


    return (
        <>
            {/* <!-- ============================================================== -->
                <!-- Bread crumb and right sidebar toggle -->
                <!-- ============================================================== --> */}
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Dashboard</h4>
                </div>
                <div className="col-md-7 align-self-center text-right">
                    <div className="d-flex justify-content-end align-items-center">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a >Home</a></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <a className="btn btn-success d-none d-lg-block m-l-15" href="https://wrappixel.com/templates/elegant-admin/"> Upgrade To Pro</a>
                    </div>
                </div>
            </div>
            {/* <!-- ============================================================== -->
                <!-- End Bread crumb and right sidebar toggle -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->
                <!-- Yearly Sales -->
                <!-- ============================================================== --> */}
            <div className="row">
                <div className="col-lg-8">
                    <Chart/>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body" style={{height:"450px"}}>
                            <PieChart/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard