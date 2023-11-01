import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ModelEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const [countries, setCountries] = useState()
    const { adminToken } = useSelector(store => store.login)
    const [country, setCountry] = useState("")
    const [loader, setLoader] = useState(false)

    const [postValues, setPostValues] = useState({
        name: "",
        brandId: 0
    })
    const BtnHandler = async (e) => {
        e.preventDefault()
        var headerToken = `Bearer ${adminToken}`
        try {
            var data = await axios.put(`http://bexarehimli-001-site1.htempurl.com/api/models/${id}`, postValues, {
                headers: {
                    "Authorization": headerToken,
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


        navigate("/admin/model")

    }


    const InputHandler = (e) => {
        setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
    }


    useEffect(() => {
        const getCountries = async () => {
            var headerToken = `Bearer ${adminToken}`
            try {
                var datas = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Brands", { headers: { "Authorization": headerToken } })
                setCountries(datas.data)
            } catch (error) {
                if (error.response.status === 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")

                }

            }

        }
        const getCountry = async () => {
            var headerToker = "Bearer " + adminToken
            try {
                var data = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Models/${id}`, { headers: { "Authorization": headerToker } })
                setCountry(data.data);
                setPostValues({
                    name: data.data.name,
                    brandId: data.data.brand.id,
                })
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

        getCountries()
    }, [])

    return (
        <div className='admin-container'>
            <h2 className='crud-header-entity mb-4'>Edit Model</h2>
            <Formik>
                <Formik enableReinitialize initialValues={{
                    name: "",
                    brandId: 0,
                }} onSubmit={async (values) => {

                }}>
                    {({ values, setFieldValue }) => (
                        <Form>

                            <div className='d-flex'>
                                <input onChange={InputHandler} defaultValue={country.name} type="text" className="login-input" name='name' placeholder="Office Name..." />
                            </div>

                            {
                                loader ?
                                    country.brand.id > 0 ?
                                        <div>
                                            <select value={country.brand.id} name="brandId" className='login-input' onChange={(e) => {
                                                setFieldValue("brandId", e.target.value)
                                                setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
                                            }}  >
                                                {
                                                    countries ?
                                                        countries.map(x => (
                                                            <option value={x.id} key={x.id}>{x.name}</option>
                                                        )) : null
                                                }
                                            </select>
                                        </div> : null
                                    : null

                            }
                            <button onClick={BtnHandler} type='submit' className='btn login-btn register-btn form-control fs-5'>Edit</button>
                        </Form>
                    )}
                </Formik>

            </Formik>

        </div>
    )
}

export default ModelEdit