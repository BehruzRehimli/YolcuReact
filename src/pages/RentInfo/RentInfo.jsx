import React, { useEffect, useState } from 'react'
import "./RentInfo.css"
import { Formik, Form, Field } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Success from '../../images/7efs.gif'



const RentInfo = () => {
    const {id}=useParams();
    const navigate =useNavigate()
    const [send,setSend]=useState(false)


    const {exPrice,sumPrice,pickUpDate,dropOffDate}=useSelector(store=>store.rent)
    const {username}=useSelector(store=>store.login)


    var localImg = (
        <img
            //src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-goose.jpg"
            src={Success}
            alt="Canvas Logo"
            style={{ width: "80%" }}
        />
    );

    return (
        <div className='col-lg-8'>
            {
                send?
                <div>{localImg}
                <p style={{fontSize:"24px",fontWeight:"600"}}>Well Done!!!</p>
                <p>You can come in our office and take this car. </p>
                </div>:
                <Formik>
                <Formik initialValues={{
                    fullname: '',
                    phone:"",
                    email:"",
                    birthday:"",
                    pasport:"",
                    address:"",
                    carPrice:(Number)(sumPrice),
                    extPrice:exPrice,
                    pickUpDate: new Date(pickUpDate),
                    dropOffDate: new Date(dropOffDate),
                    dropOfficeId:null,
                    carId:id,
                    username:username,
                }} onSubmit={async (values) => {
                    try {
                        var res=axios.post("http://bexarehimli-001-site1.htempurl.com/api/Rents",values)
                        setSend(true)
                    } catch (error) {
                        navigate("/error")
                    }
                }}>
                    {({ values }) => (
                        <Form>
                            <h4 className='text-start rent-info-title mt-4'>Driver Information</h4>
                            <div className='mt-4 text-start'>
                                <label className='text-start rent-info-label' htmlFor="fullname">Fullname</label>
                                <Field type="text" id={"fullname"} className="driver-info w-100" name='fullname' />
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='mt-4 text-start' style={{width:"48%"}}>
                                    <label className='text-start rent-info-label' htmlFor="phone">Phone</label>
                                    <Field type="phone" id={"phone"} className="driver-info w-100" name='phone' />
                                </div>
                                <div className='mt-4 text-start' style={{width:"48%"}}>
                                    <label className='text-start rent-info-label' htmlFor="email">E-mail</label>
                                    <Field type="email" id={"email"} className="driver-info w-100" name='email' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='mt-4 text-start' style={{width:"48%"}}>
                                    <label className='text-start rent-info-label' htmlFor="birthday">Driver's Birthday (Ex: 30/12/1995)</label>
                                    <Field type="text" id={"birthday"} className="driver-info w-100" name='birthday'  />
                                </div>
                                <div className='mt-4 text-start' style={{width:"48%"}}>
                                    <label className='text-start rent-info-label' htmlFor="pasport">Passport Number</label>
                                    <Field type="text" id={"pasport"} className="driver-info w-100" name='pasport' />
                                </div>
                            </div>
                            <div className='mt-4 text-start'>
                                <label className='text-start rent-info-label' htmlFor="address">Address</label>
                                <Field type="text" id={"address"} className="driver-info w-100" name='address' />
                            </div>
                            <button type='submit' className='btn login-btn register-btn form-control fs-6 mt-5'>Rent Now</button>

                        </Form>
                    )}
                </Formik>

            </Formik>

            }
        </div>
    )
}

export default RentInfo