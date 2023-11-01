import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field } from "formik"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const AdminEdit = () => {
    const { adminToken } = useSelector(store => store.login)
    const navigate = useNavigate()
    const { id } = useParams();
    const [country, setCountry] = useState({})
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const getCountry = async () => {
            var headerToker = "Bearer " + adminToken;
            try {
                var data = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Admins/${id}`, { headers: { "Authorization": headerToker } })
                setCountry(data.data);
                setLoader(true)

            } catch (error) {
                if (error.response.status === 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")

                }

            }
        }
        getCountry();
    }, [])


    return (
        <div>
            <div className='admin-container'>
                <h2 className='crud-header-entity mb-4'>Edit Admin</h2>
                {
                    loader ?
                        <Formik>
                            <Formik enableReinitialize initialValues={{
                                fullname: country.fullname,
                                userName: country.userName,
                                phoneNumber: country.phoneNumber,
                                email: country.email,
                                pasaword: "",
                                againPassword: ""
                            }} onSubmit={async (values) => {
                                var headerToken = `Bearer ${adminToken}`
                                console.log(headerToken);
                                try {
                                    var result = await axios.put(`http://bexarehimli-001-site1.htempurl.com/api/Admins/${id}`, values, { headers: { "Authorization": headerToken } })
                                    navigate("/admin/admin")
                                } catch (error) {
                                    console.log(result);
                                    if (error.response.status === 401) {
                                        navigate("/admin/login")
                                    }
                                    else {
                                        navigate("/error")

                                    }

                                }
                            }}>
                                {({ values }) => (
                                    <Form>
                                        <div className='d-flex'>
                                            <Field type="text" required className="login-input" name='fullname' placeholder="Fullname..." />
                                        </div>
                                        <div className='d-flex'>
                                            <Field type="text" required className="login-input" name='username' placeholder="Username..." />
                                        </div>
                                        <div className='d-flex'>
                                            <Field type="phone" required className="login-input" name='phoneNumber' placeholder="Phone..." />
                                        </div>
                                        <div className='d-flex'>
                                            <Field type="mail" defaultValue={country.email} required className="login-input" name='email' placeholder="Email..." />
                                        </div>
                                        <div className='d-flex'>
                                            <Field type="password" className="login-input" name='password'  placeholder="Password..." />
                                        </div>
                                        <div className='d-flex'>
                                            <Field type="password"  className="login-input" name='againPassword' placeholder="Again Password..." />
                                        </div>
                                        <button type='submit' className='btn login-btn register-btn form-control '>Edit</button>
                                    </Form>
                                )}
                            </Formik>

                        </Formik> : null


                }
            </div>

        </div>

    )
}

export default AdminEdit