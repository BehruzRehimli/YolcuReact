import React from 'react'
import "./Login.css"
import image from "../../images/img-01.png"
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setAdminToken,setAdminUsername,adminLogedYes, setUsername, adminLogedNo } from '../../control/loginSlice'
import jwt_decode from "jwt-decode"

const Login = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={image} alt="IMG" />
                        </div>

                        <div className="login100-form validate-form mb-5">
                            <span className="login100-form-title">
                                Admin Login
                            </span>

                            <Formik>
                                <Formik initialValues={{
                                    username: '',
                                    password: "",
                                }} onSubmit={async (values) => {
                                    try {
                                        const data = await axios.post('http://bexarehimli-001-site1.htempurl.com/api/Accounts/AdminLogin', values)
                                        localStorage.setItem("YolcuAdmin", data.data.token)
                                        const decoded = jwt_decode(data.data.token);
                                        let user=decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
                                        dispatch(setAdminUsername(user))
                                        dispatch(setAdminToken(data.data.token))
                                        dispatch(adminLogedYes())
                                        navigate("/admin")
    
                                    } catch (error) {
                                        navigate("/error")
                                    }
                                }}>
                                    {({ values }) => (
                                        <Form>
                                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                                <Field className="input100" type="text" name="username" placeholder="Username" />
                                                <span className="focus-input100"></span>
                                                <span className="symbol-input100">
                                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                                </span>
                                            </div>

                                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                                <Field className="input100" type="password" name="password" placeholder="Password" />
                                                <span className="focus-input100"></span>
                                                <span className="symbol-input100">
                                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                                </span>
                                            </div>

                                            <div className="container-login100-form-btn">
                                            <button type='submit' className='login100-form-btn'>Login</button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>

                            </Formik>





                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login