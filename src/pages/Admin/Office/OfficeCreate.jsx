import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const OfficeCreate = () => {
    const navigate = useNavigate()

    const [entity, setEntity] = useState();

    const { adminToken } = useSelector(store => store.login)

    useEffect(() => {
        const getEntity = async () => {
            var headerToken = `Bearer ${adminToken}`
            try {
                var datas = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Cities", { headers: { "Authorization": headerToken } })
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")

                }

            }

            setEntity(datas.data)
        }
        getEntity()
    }, [])

    const [postValues, setPostValues] = useState({
        name: '',
        address: '',
        phone: '',
        openTimes: '',
        cityId: 3
    })
    const BtnHandler = async (e) => {
        e.preventDefault()
        var headerToken = `Bearer ${adminToken}`
        try {
            var data = await axios.post("http://bexarehimli-001-site1.htempurl.com/api/offices", postValues, {
                headers: {
                    "Authorization": headerToken
                }
            })
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                navigate("/admin/login")
            }
            else {
                navigate("/error")

            }

        }
        navigate("/admin/office")

    }


    const InputHandler = (e) => {
        setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
    }




    return (
        <div className='admin-container'>
            <h2 className='crud-header-entity mb-4'>Create Office</h2>
            <Formik>
                <Formik initialValues={{
                    name: '',
                    address: '',
                    phone: '',
                    openTimes: '',
                    cityId: 3
                }} onSubmit={async (values) => {
                    // var headerToken = `Bearer ${adminToken}`
                    // try {
                    //     var result = await axios.post("http://bexarehimli-001-site1.htempurl.com/api/offices", values, { headers: { "Authorization": headerToken } })
                    // } catch (error) {
                    //     console.log(error.response);
                    //     if (error.response.status === 401) {
                    //         navigate("/admin/login")
                    //     }
                    // }
                    // if (result.status === 200) {
                    //     navigate("/admin/office")
                    // }
                }}>
                    {({ values, setFieldValue }) => (
                        <Form>

                            <div className='d-flex'>
                                <input type="text" onChange={InputHandler} className="login-input" name='name' placeholder="Office Name..." />
                            </div>
                            <div className='d-flex'>
                                <input type="text" onChange={InputHandler} className="login-input" name='address' placeholder="Address..." />
                            </div>
                            <div className='d-flex'>
                                <input type="phone" onChange={InputHandler} className="login-input" name='phone' placeholder="Phone Number..." />
                            </div>
                            <div className='d-flex'>
                                <input type="text" onChange={InputHandler}
                                 className="login-input" name='openTimes' placeholder="Time Working (hh:mm-hh:mm)..." />
                            </div>
                            <div>
                                <select  name="countryId" id="" className='login-input' onChange={(e) => {
                                    setFieldValue("countryId", e.target.value)
                                    setPostValues(prev=>{return{...prev,cityId:e.target.value}})
                                }}  >
                                    {
                                        entity ?
                                            entity.map(x => (
                                                <option value={x.id} key={x.id}>{x.name}</option>
                                            )) : null
                                    }
                                </select>
                            </div>

                            <button onClick={BtnHandler} type='submit' className='btn login-btn register-btn form-control '>Create</button>
                        </Form>
                    )}
                </Formik>

            </Formik>

        </div>
    )
}

export default OfficeCreate