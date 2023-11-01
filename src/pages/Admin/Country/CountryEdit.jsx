import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field } from "formik"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const CountryEdit = () => {

    const { adminToken } = useSelector(store => store.login)
    const navigate = useNavigate()
    const { id } = useParams();
    const [country, setCountry] = useState("")
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const getCountry = async () => {
            var headerToker = "Bearer " + adminToken;
            try {
                var data = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Countries/${id}`, { headers: { "Authorization": headerToker } })
                setCountry(data.data.name);
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

    useEffect(() => {
        console.log(country);
    }, [loader])


    return (
        <div>
            <div className='admin-container'>
                <h2 className='crud-header-entity mb-4'>Create Country</h2>
                {
                    loader ?
                        <Formik>
                            <Formik enableReinitialize initialValues={{
                                name: country,
                            }} onSubmit={async (values) => {
                                var headerToken = `Bearer ${adminToken}`
                                console.log(headerToken);
                                try {
                                    var result = await axios.put(`http://bexarehimli-001-site1.htempurl.com/api/countries/${id}`, values, { headers: { "Authorization": headerToken } })
                                    navigate("/admin/country")
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

                                            <Field type="text" className="login-input" name='name' placeholder="Country Name..." />
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

export default CountryEdit