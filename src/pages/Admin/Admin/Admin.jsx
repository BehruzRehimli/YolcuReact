import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from "react-icons/fi"
import { MdDeleteForever } from "react-icons/md"
import { BiSolidChevronLeft } from "react-icons/bi";
import { BiSolidChevronRight } from "react-icons/bi";

const Admin = () => {
    const navigate = useNavigate();

    const { adminToken } = useSelector(store => store.login)

    const [countries, setCountries] = useState({
        isLoad: false,
        countries: []
    })


    useEffect(() => {
        const getCountries = async () => {
            var token = "Bearer " + adminToken
            try {
                var datas = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Admins`, { headers: { "Authorization": token } })

                setCountries(prev => { return { ...prev, countries: datas.data, isLoad: true } })
            } catch (error) {
                console.log(error);
                if (error.response.status === 401 || error.response.status === 403) {
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
        <div>
            <div className="admin-container">
                <h2 className='text-start  crud-header-entity pb-3' >Admin</h2>
                <div className='text-end me-3'>
                    <Link className='btn btn-primary' to={"/admin/admin/create"}>Create Admin</Link>
                </div>
                <div className="table-responsive mt-4">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="text-center ">#</th>
                                <th>Fullname</th>
                                <th>Username</th>
                                <th>Phone</th>
                                <th>Roles</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                countries.isLoad ?
                                    countries.countries.map((x, index) => (
                                        <tr key={x.id}>

                                            <td className="text-center">{index  + 1}</td>
                                            <td className="txt-oflo">{x.fullname}</td>
                                            <td className="txt-oflo">{x.userName}</td>
                                            <td className="txt-oflo">{x.phoneNumber}</td>
                                            <td className="txt-oflo">{x.roles.map((x,index)=>{
                                                return x+" "
                                            })}</td>
                                            <td><span className="text-success">
                                                <Link to={`/admin/admin/edit/${x.id}`} className='btn btn-warning'> <FiEdit className='me-2' />Edit</Link>
                                                <button onClick={async () => {
                                                    var token = "Bearer " + adminToken
                                                    try {
                                                        var datas = await axios.delete(`http://bexarehimli-001-site1.htempurl.com/api/Admins/${x.id}`, { headers: { "Authorization": token } })
                                                        var datas = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Admins", { headers: { "Authorization": token } })
                                                        setCountries(prev => { return { ...prev, countries: datas.data, isLoad: true } })

                                                    } catch (error) {
                                                        if (error.response.status === 401) {
                                                            navigate("/admin/login")
                                                        }
                                                        else {
                                                            navigate("/error")

                                                        }

                                                    }

                                                }} className='btn btn-danger ms-3'> <MdDeleteForever className='me-2 fs-5' />Delete</button>
                                            </span></td>
                                        </tr>

                                    )) : null
                            }



                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}

export default Admin