import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CarCreate = () => {
    const navigate = useNavigate()
    const [countries, setCountries] = useState()
    const [types, setTypes] = useState()
    const [models, setModels] = useState()

    const { adminToken } = useSelector(store => store.login)
    const [image, setImage] = useState()

    const [postValues, setPostValues] = useState({
        name: "",
        priceDaily: null,
        depozitPrice: null,
        totalMillage: null,
        imageFile: null,
        isFreeCancelation: true,
        cancelationPrice: 0,
        minDriverAge: null,
        minYoungDriverAge: null,
        minDriverLisanseYear: null,
        minYoungDriverLisanseYear: null,
        transmission: 1,
        fuelType: null,
        modelId: 1,
        typeId: 1,
        officeId: 1
    })
    const BtnHandler = async (e) => {
        e.preventDefault()
        var headerToken = `Bearer ${adminToken}`
        try {
            var data = await axios.post("http://bexarehimli-001-site1.htempurl.com/api/cars", postValues, {
                headers: {
                    "Authorization": headerToken,
                    "Content-Type": 'multipart/form-data'
                }
            })
            navigate("/admin/car")
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                navigate("/admin/login")
            }
            else {
                navigate("/error")

            }

        }

    }


    const InputHandler = (e) => {
        setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
    }


    useEffect(() => {
        const getCountries = async () => {
            var headerToken = `Bearer ${adminToken}`
            try {
                var datas = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Offices", { headers: { "Authorization": headerToken } })
                var models = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Models", { headers: { "Authorization": headerToken } })
                var types = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Types", { headers: { "Authorization": headerToken } })

            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/admin/login")
                }
                else {
                    navigate("/error")

                }

            }

            setCountries(datas.data)
            setModels(models.data)
            setTypes(types.data)
        }
        getCountries()
    }, [])

    return (
        <div className='admin-container'>
            <h2 className='crud-header-entity mb-4'>Create Car</h2>
            <Formik>
                <Formik initialValues={{
                    name: "",
                    priceDaily: null,
                    depozitPrice: null,
                    totalMillage: null,
                    imageFile: null,
                    isFreeCancelation: true,
                    cancelationPrice: 0,
                    minDriverAge: null,
                    minYoungDriverAge: null,
                    minDriverLisanseYear: null,
                    minYoungDriverLisanseYear: null,
                    transmission: null,
                    fuelType: null,
                    modelId: 1,
                    typeId: 1,
                    officeId: 1
                }} onSubmit={async (values) => {
                }}>
                    {({ values, setFieldValue }) => (
                        <Form>

                            <div className='d-flex'>
                                <input onChange={InputHandler} type="text" className="login-input" name='name' placeholder="Car Name..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='priceDaily' placeholder="Daily Price..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='depozitPrice' placeholder="Deposit Price..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='totalMillage' placeholder="Total Millage..." />
                            </div>


                            <div className='text-start'>
                                <label style={{ marginTop: "20px", textAlign: "left", fontSize: "16px", fontWeight: "500", color: "#ffa900" }} htmlFor="image">Add Image...</label>
                                <input onChange={(e) => {
                                    setFieldValue("imageFile", e.target.files[0])
                                    setImage(URL.createObjectURL(e.target.files[0]))
                                    setPostValues(prev => { return { ...prev, [e.target.name]: e.target.files[0] } })
                                }} style={{ marginTop: "0" }} type="file" id='image' className="login-input" name='imageFile' placeholder="Add Image..." />
                            </div>
                            <div className='mt-3 text-start'>
                                {
                                    image &&
                                    <img src={image} alt="img" />
                                }
                            </div>
                            <div className='d-flex mt-4 justify-content-center'>
                                <div>
                                    <label htmlFor="cancel-free">Is Free Cancelation?</label><br />
                                    <input defaultChecked onChange={(e) => {
                                        setPostValues(prev => { return { ...prev, [e.target.name]: e.target.checked } })
                                    }} type="checkbox" id='cancel-free' className="login-input check" name='isFreeCancelation' placeholder="Is Free Cancelation..." />

                                </div>
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} defaultValue={0} type="number" className="login-input" name='cancelationPrice' placeholder="Cancelation Price..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='minDriverAge' placeholder="Minimum Driver Age..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='minYoungDriverAge' placeholder="Minimum Young Driver Age..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='minDriverLisanseYear' placeholder="Minimum Driver Lisanse Year..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='minYoungDriverLisanseYear' placeholder="Minimum Young Driver Lisanse Year..." />
                            </div>
                            <div>
                                <select name="transmission" id="" className='login-input' onChange={(e) => {
                                    setFieldValue("transmission", e.target.value)
                                    setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
                                }}  >

                                    <option value="1">Automatic</option>
                                    <option value="2">Manuel</option>

                                </select>
                            </div>
                            <div>
                                <select name="fuelType" id="" className='login-input' onChange={(e) => {
                                    setFieldValue("fuelType", e.target.value)
                                    setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
                                }}  >

                                    <option value="1">Diesel</option>
                                    <option value="2">Gas Diesel</option>
                                    <option value="3">Electric</option>
                                    <option value="4">Gas</option>

                                </select>
                            </div>

                            <div>
                                <select name="modelId" id="" className='login-input' onChange={(e) => {
                                    setFieldValue("modelId", e.target.value)
                                    setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
                                }}  >
                                    {
                                        models ?
                                            models.map(x => (
                                                <option value={x.id} key={x.id}>{x.name}</option>
                                            )) : null
                                    }
                                </select>
                            </div>
                            <div>
                                <select name="typeId" id="" className='login-input' onChange={(e) => {
                                    setFieldValue("typeId", e.target.value)
                                    setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
                                }}  >
                                    {
                                        types ?
                                            types.map(x => (
                                                <option value={x.id} key={x.id}>{x.name}</option>
                                            )) : null
                                    }
                                </select>
                            </div>
                            <div>
                                <select name="officeId" id="" className='login-input' onChange={(e) => {
                                    setFieldValue("officeId", e.target.value)
                                    setPostValues(prev => { return { ...prev, [e.target.name]: e.target.value } })
                                }}  >
                                    {
                                        countries ?
                                            countries.map(x => (
                                                <option value={x.id} key={x.id}>{x.name}</option>
                                            )) : null
                                    }
                                </select>
                            </div>
                            <button onClick={BtnHandler} type='submit' className='btn login-btn register-btn form-control fs-5'>Create</button>
                        </Form>
                    )}
                </Formik>

            </Formik>

        </div>
    )
}

export default CarCreate