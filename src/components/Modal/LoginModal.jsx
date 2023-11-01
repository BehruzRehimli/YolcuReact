import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiUser3Fill } from 'react-icons/ri'
import axios from 'axios';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setUsername, logedYes, setToken } from '../../control/loginSlice';
import { RiMailCheckLine } from "react-icons/ri"
import Success from '../../images/7efs.gif'
import Fail from '../../images/fail1.gif'
import {GiBackwardTime} from "react-icons/gi"



function LoginModal(props) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)



    useEffect(() => {
        if (props.user.token) {
            props.setUser(prev => { return { ...prev, isLoged: true } })
        }
    }, [props.user.token])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var localImg = (
        <img
            //src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-goose.jpg"
            src={Success}
            alt="Canvas Logo"
            style={{ width: "80%" }}
        />
    );


    var secondImg = (
        <img
            //src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-goose.jpg"
            src={Fail}
            alt="Canvas Logo"
            style={{ width: "70%" }}
        />
    );


    return (
        <>

            <button onClick={handleShow} className='text-start bg-transparent border-0' style={{ color: "#03437f" }} >Login</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header onClick={() => { setPage(1) }} closeButton>
                </Modal.Header>
                {
                    page === 1 ?
                        <Modal.Body>
                            <div className='d-flex justify-content-left align-items-center ' style={{ padding: "10px 30px" }}>
                                <RiUser3Fill style={{ fontSize: "40px", color: "#2169aa" }} />
                                <span style={{ fontSize: "26px", fontWeight: "600", marginLeft: "20px" }}>Login</span>
                            </div>
                            <div style={{ padding: "10px 30px" }}>
                                <Formik>
                                    <Formik initialValues={{
                                        username: '',
                                        password: "",
                                    }} onSubmit={async (values) => {
                                        const data = await axios.post('http://bexarehimli-001-site1.htempurl.com/api/Accounts/Login', values)
                                        localStorage.setItem("YolcuToken", data.data.token)
                                        const decoded = jwt_decode(data.data.token);
                                        let user = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
                                        dispatch(setUsername(user))
                                        dispatch(logedYes())
                                        dispatch(setToken(data.data.token))
                                        props.setUser(prev => { return { ...prev, token: data.data.token, isLoged: true, username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] } })
                                        handleClose();
                                    }}>
                                        {({ values }) => (
                                            <Form>
                                                <div className='d-flex'>
                                                    <span className="left ">
                                                        <RiUser3Fill style={{ fontSize: "20px", color: "#bbbbbb" }} />
                                                    </span>
                                                    <Field type="text" placeholder="Username" className="login-input username" name='username' />
                                                </div>
                                                <div>
                                                    <Field type="password" placeholder="Password" className="login-input" name='password' />

                                                </div>
                                                <button type='submit' className='btn login-btn form-control '>Login</button>

                                                <p onClick={() => { setPage(2) }} className='forget-pass-btn'>Forget Password</p>
                                            </Form>
                                        )}
                                    </Formik>

                                </Formik>

                            </div>

                        </Modal.Body> :
                        page === 2 ?
                            <Modal.Body>
                                <div style={{ padding: "10px 30px" }}>
                                    <div className='d-flex justify-content-center align-items-center '>
                                        <RiMailCheckLine style={{ color: "#ffa900", fontSize: "35px" }} />
                                        <span style={{ color: "#ffa900", fontSize: "22px", marginLeft: "20px", fontWeight: "500" }}>Forget Password</span>
                                    </div>
                                    <p className='text-center fw-bolder fs-5 mt-3 ' style={{ fontStyle: "italic", color: "#9b9b9b" }}>Write Your Mail</p>

                                    <div>
                                        <Formik>
                                            <Formik initialValues={{
                                                email: '',
                                            }} onSubmit={async (values) => {
                                                axios.post(`http://bexarehimli-001-site1.htempurl.com/api/Accounts/ForgetPassword/${values.email}`).then(res => setPage(3)).catch(error => setPage(4))
                                            }}>
                                                {({ values }) => (
                                                    <Form>

                                                        <div className='d-flex'>

                                                            <Field type="mail" className="login-input" name='email' placeholder="Your Email..." />
                                                        </div>
                                                        <button type='submit' className='btn login-btn register-btn form-control '>Confirm</button>
                                                    </Form>
                                                )}
                                            </Formik>

                                        </Formik>

                                    </div>
                                </div>
                            </Modal.Body> :
                            page === 3 ?
                                <Modal.Body>
                                    <div style={{ padding: "10px 30px" }}>
                                        <div className='d-flex justify-content-center align-items-center '>
                                            <RiMailCheckLine style={{ color: "#ffa900", fontSize: "35px" }} />
                                            <span style={{ color: "#ffa900", fontSize: "22px", marginLeft: "20px", fontWeight: "500" }}>Forget Password</span>
                                        </div>
                                        <p className='text-center fw-bolder fs-5 mt-3 ' style={{ fontStyle: "italic", color: "#9b9b9b" }}>Check Your Mail</p>
                                        <div className='text-center'>
                                            {
                                                localImg
                                            }
                                        </div>
                                    </div>
                                </Modal.Body> :
                                page === 4 ?
                                    <Modal.Body>
                                        <div style={{ padding: "10px 30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {
                                                secondImg
                                            }
                                        </div>
                                        <p className='text-center fs-5 fw-bold mb-4' style={{ color: "#ffa900", marginTop: "10px" }}>Wrong Email !!!</p>
                                        <div className='text-center mb-3'>
                                            <button onClick={async () => {
                                                setPage(2)
                                            }} className='back-register-btn'><GiBackwardTime style={{ fontSize: "25px", marginRight: "10px" }} />Back to Write Email</button>
                                        </div>
                                    </Modal.Body> : null




                }
            </Modal>
        </>
    );
}
export default LoginModal;