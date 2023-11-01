import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from "react-icons/fi"
import { MdOutlineDone, MdOutlineClose } from "react-icons/md"
import { BiSolidChevronLeft } from "react-icons/bi";
import { BiSolidChevronRight } from "react-icons/bi";

const Rent = () => {
    const navigate = useNavigate();

    const { adminToken } = useSelector(store => store.login)

    const [countries, setCountries] = useState({
        isLoad: false,
        countries: [],
        change: 0
    })

    useEffect(() => {
        const getCountries = async () => {
            var token = "Bearer " + adminToken
            try {
                axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Rents`, { headers: { "Authorization": token } }).then(res => setCountries(prev => { return { ...prev, countries: res.data, isLoad: true } })).catch(error => console.log(error))

            } catch (error) {
                if (error.response.status === 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")
                }

            }
        }
        getCountries();
    }, [countries.change])

    return (
        <div className="admin-container">
            <h2 className='text-start  crud-header-entity pb-3' >Rent</h2>

            <div className="table-responsive mt-4">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="text-center ">#</th>
                            <th>Name</th>
                            <th>Cityies Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            countries.isLoad ?
                                countries.countries.map((x, index) => (
                                    <tr key={x.id}>

                                        <td className="text-center">{index + 1}</td>
                                        <td className="txt-oflo">{x.fullname}</td>
                                        <td className="txt-oflo">{x.phone}</td>
                                        <td><span className="text-success">
                                            <button onClick={() => {
                                                axios.put(`http://bexarehimli-001-site1.htempurl.com/api/Rents/${x.id}/1`, { headers: { "Authorization": "Bearer "+adminToken } }).then(res => setCountries(prev => { return { ...prev, change: prev.change + 1 } })).catch(error=>console.log(adminToken))
                                            }} className='btn btn-success'> <MdOutlineDone className='me-2' />Accept</button>
                                            <button onClick={() => {
                                                var token = "Bearer " + adminToken
                                                axios.put(`http://bexarehimli-001-site1.htempurl.com/api/Rents/${x.id}/2`, { headers: { "Authorization": "Bearer "+adminToken } }).then(res => setCountries(prev => { return { ...prev, change: prev.change + 1 } }))
                                            }} className='btn btn-danger ms-2'> <MdOutlineClose className='me-2' />Reject</button>


                                        </span></td>
                                    </tr>

                                )) : null
                        }



                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Rent