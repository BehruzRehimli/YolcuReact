import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const OfficeEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const [countries, setCountries] = useState()
    const { adminToken } = useSelector(store => store.login)
    const [country, setCountry] = useState("")
    const [loader, setLoader] = useState(false)

    const [postValues, setPostValues] = useState({
        name: "",
        address: "",
        phone: "",
        openTimes: "",
        cityId: 0
    })
    const BtnHandler = async (e) => {
        e.preventDefault()
        var headerToken = `Bearer ${adminToken}`
        try {
            var data = await axios.put(`http://bexarehimli-001-site1.htempurl.com/api/offices/${id}`, postValues, {
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


        navigate("/admin/office")

    }


    const InputHandler = (e) => {
        setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
    }

    let idOfCity=""

    useEffect(() => {
        const getCountries = async () => {
            var headerToken = `Bearer ${adminToken}`
            try {
                var datas = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Cities", { headers: { "Authorization": headerToken } })
            } catch (error) {
                if (error.response.status === 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")

                }

            }

            setCountries(datas.data)
        }
        const getCountry = async () => {
            var headerToker = "Bearer " + adminToken
            try {
                var data = await axios.get(`http://bexarehimli-001-site1.htempurl.com/api/Offices/${id}`, { headers: { "Authorization": headerToker } })

            } catch (error) {
                if (error.response.status === 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")

                }


            }
            idOfCity=data.data.city.id
            setCountry(data.data);
            setPostValues({
                name: data.data.name,
                address: data.data.address,
                phone: data.data.phone,
                openTimes: data.data.openTimes,
                cityId: data.data.city.id,
            })
            setLoader(true)
        }
        getCountry();

        getCountries()
    }, [])

    return (
        <div className='admin-container'>
            <h2 className='crud-header-entity mb-4'>Edit Office</h2>
            <Formik>
                <Formik enableReinitialize initialValues={{
                    name: "",
                    address: "",
                    phone: "",
                    openTimes: "",
                    cityId: 0
                }} onSubmit={async (values) => {

                }}>
                    {({ values, setFieldValue }) => (
                        <Form>

                            <div className='d-flex'>
                                <input onChange={InputHandler} defaultValue={country.name} type="text" className="login-input" name='name' placeholder="Office Name..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} defaultValue={country.address} type="text" className="login-input" name='address' placeholder="Address" />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} defaultValue={country.phone} type="text" className="login-input" name='phone' placeholder="Phone" />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} defaultValue={country.openTimes} type="text" className="login-input" name='openTimes' placeholder="Time Working (hh:mm-hh:mm)..." />
                            </div>

                            {
                                loader ?
                                    country.city.id > 0 ?
                                        <div>
                                            <select defaultValue={country.city.id} name="cityId" className='login-input' onChange={(e) => {
                                                setFieldValue("cityId", e.target.value)
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

export default OfficeEdit