import React from 'react'
import { Formik,Form,Field } from 'formik'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CountryCreate = () => {
    const navigate=useNavigate()

    const {adminToken}=useSelector(store=>store.login)
    return (
        <div className='admin-container'>
            <h2 className='crud-header-entity mb-4'>Create Country</h2>
            <Formik>
                <Formik initialValues={{
                    name: '',
                }} onSubmit={async (values) => {
                    var headerToken = `Bearer ${adminToken}`
                    try {
                        var result=await axios.post("http://bexarehimli-001-site1.htempurl.com/api/countries",values,{headers:{"Authorization": headerToken}})
                    } catch (error) {
                        console.log(result);
                        if (error.response.status===401) {
                            navigate("/admin/login")
                        }
                        else {
                            navigate("/error")
        
                        }
        
                    }
                    if (result.status===200) {
                        navigate("/admin/country")
                    }
                }}>
                    {({ values }) => (
                        <Form>

                            <div className='d-flex'>
                                <Field type="text" className="login-input" name='name' placeholder="Country Name..." />
                            </div>
                            <button type='submit' className='btn login-btn register-btn form-control '>Create</button>
                        </Form>
                    )}
                </Formik>

            </Formik>

        </div>
    )
}

export default CountryCreate