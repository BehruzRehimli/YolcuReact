import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminCreate = () => {
    const navigate = useNavigate()

    const { adminToken } = useSelector(store => store.login)

    return (
        <div>
            <div className='admin-container'>
                <h2 className='crud-header-entity mb-4'>Create Admin</h2>
                <Formik>
                    <Formik initialValues={{
                        fullname: '',
                        userName:"",
                        phoneNumber:"",
                        email:"",
                        pasaword:"",
                        againPassword:""
                    }} onSubmit={async (values) => {
                        var headerToken = `Bearer ${adminToken}`
                        try {
                            var result = await axios.post("http://bexarehimli-001-site1.htempurl.com/api/Admins", values, { headers: { "Authorization": headerToken } })
                        } catch (error) {
                            console.log(result);
                            if (error.response.status === 401) {
                                navigate("/admin/login")
                            }
                            else {
                                navigate("/error")

                            }

                        }
                        if (result.status === 200) {
                            navigate("/admin/admin")
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
                                    <Field type="mail" required className="login-input" name='email' placeholder="Email..." />
                                </div>
                                <div className='d-flex'>
                                    <Field type="password" className="login-input" name='password' required placeholder="Password..." />
                                </div>
                                <div className='d-flex'>
                                    <Field type="password" required className="login-input" name='againPassword' placeholder="Again Password..." />
                                </div>
                                <button type='submit' className='btn login-btn register-btn form-control '>Create</button>
                            </Form>
                        )}
                    </Formik>

                </Formik>

            </div>

        </div>
    )
}

export default AdminCreate