import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CityCreate = () => {
    const navigate = useNavigate()
    const [countries, setCountries] = useState()
    const { adminToken } = useSelector(store => store.login)
    const [image, setImage] = useState()

    const [postValues,setPostValues]=useState({
        name:"",
        homeSliderOrder: null,
        homePopularOrder: null,
        imageFile: null,
        countryId: 0
    })
    const BtnHandler=async(e)=>{
        e.preventDefault()
        var headerToken = `Bearer ${adminToken}`
        try {
            var data= await axios.post("http://bexarehimli-001-site1.htempurl.com/api/cities",postValues,{headers:{
                "Authorization": headerToken,
                "Content-Type":'multipart/form-data'
            }})
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                navigate("/admin/login")
            }
            else {
                navigate("/error")

            }

        }
        navigate("/admin/city")

    }


    const InputHandler=(e)=>{
        setPostValues(prev=>{return {...prev,[e.target.name]:e.target.value}})
    }


    useEffect(() => {
        const getCountries = async () => {
            var headerToken = `Bearer ${adminToken}`
            try {
                var datas = await axios.get("http://bexarehimli-001-site1.htempurl.com/api/Countries", { headers: { "Authorization": headerToken } })
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
        }
        getCountries()
    }, [])

    return (
        <div className='admin-container'>
            <h2 className='crud-header-entity mb-4'>Create City</h2>
            <Formik>
                <Formik initialValues={{
                    name: '',
                    homeSliderOrder: "",
                    homePopularOrder: "",
                    imageFile: null,
                    countryId: 0
                }} onSubmit={async (values) => {
                }}>
                    {({ values, setFieldValue }) => (
                        <Form>

                            <div className='d-flex'>
                                <input onChange={InputHandler} type="text" className="login-input" name='name' placeholder="City Name..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='homeSliderOrder' placeholder="Home Slider Order..." />
                            </div>
                            <div className='d-flex'>
                                <input onChange={InputHandler} type="number" className="login-input" name='homePopularOrder' placeholder="Popular City Order..." />
                            </div>
                            <div className='text-start'>
                                <label style={{ marginTop: "20px", textAlign: "left", fontSize: "16px", fontWeight: "500", color: "#ffa900" }} htmlFor="image">Add Image...</label>
                                <input  onChange={(e) => {
                                    setFieldValue("imageFile", e.target.files[0])
                                    setImage(URL.createObjectURL(e.target.files[0]))
                                    setPostValues(prev=>{return {...prev,[e.target.name]:e.target.files[0]}})
                                }} style={{ marginTop: "0" }} type="file" id='image' className="login-input" name='imageFile' placeholder="Add Image..." />
                            </div>
                            <div className='mt-3 text-start'>
                                {
                                    image &&
                                    <img src={image} alt="img" />
                                }
                            </div>
                            <div>
                                <select name="countryId" id="" className='login-input' onChange={(e) => {
                                    setFieldValue("countryId", e.target.value)
                                    setPostValues(prev=>{ return{...prev,[e.target.name]:e.target.value}})
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

export default CityCreate