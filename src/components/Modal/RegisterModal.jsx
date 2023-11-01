import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaUserPlus } from "react-icons/fa"
import { RiMailCheckLine } from "react-icons/ri"
import Success from '../../images/7efs.gif'
import Fail from '../../images/fail1.gif'
import { GiBackwardTime } from "react-icons/gi"
import axios from "axios"
import { AiOutlineClose } from 'react-icons/ai';
import { CloseButton } from 'react-bootstrap';

function RegisterModal() {
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1)

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

    const [registerToken, setRegisterToken] = useState("")

    return (
        <>

            <button onClick={handleShow} className="text-start last" style={{ color: "#ffa900" }}>Register</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header onClick={()=>{setPage(1)}} closeButton>
                </Modal.Header>               
                 {
                    page === 1 ?
                        <Modal.Body>
                            <div style={{ padding: "10px 30px" }}>
                                <div className='d-flex justify-content-left align-items-center '>
                                    <FaUserPlus style={{ color: "#ffa900", fontSize: "30px" }} />
                                    <span style={{ color: "#ffa900", fontSize: "22px", marginLeft: "20px", fontWeight: "500" }}>Register</span>
                                </div>
                                <div>
                                    <Formik>
                                        <Formik initialValues={{
                                            fullname: '',
                                            username: "",
                                            email: "",
                                            password: "",
                                            confirmPassword: ""
                                        }} onSubmit={async (values) => {
                                            setPage(2)
                                            const data = await axios.post('http://bexarehimli-001-site1.htempurl.com/api/Accounts/Register', values)
                                            setRegisterToken(data.data.token)
                                        }}>
                                            {({ values }) => (
                                                <Form>

                                                    <div className='d-flex'>

                                                        <Field type="text" className="login-input" name='fullname' placeholder="Fullname" />
                                                    </div>
                                                    <div className='d-flex'>

                                                        <Field type="text" className="login-input" name='username' placeholder="Username" />
                                                    </div>
                                                    <div className='d-flex'>

                                                        <Field type="mail" className="login-input" name='email' placeholder="Email" />
                                                    </div>
                                                    <div>
                                                        <Field type="password" className="login-input" name='password' placeholder="Password" />

                                                    </div>
                                                    <div>
                                                        <Field type="password" className="login-input" name='confirmPassword' placeholder="Confirm Password" />

                                                    </div>
                                                    <button type='submit' className='btn login-btn register-btn form-control '>Register</button>
                                                </Form>
                                            )}
                                        </Formik>

                                    </Formik>

                                </div>
                            </div>
                        </Modal.Body> :
                        page === 2 ?
                            <Modal.Body>
                                <div style={{ padding: "10px 30px" }}>
                                    <div className='d-flex justify-content-center align-items-center '>
                                        <RiMailCheckLine style={{ color: "#ffa900", fontSize: "35px" }} />
                                        <span style={{ color: "#ffa900", fontSize: "22px", marginLeft: "20px", fontWeight: "500" }}>Mail Confirmation</span>
                                    </div>
                                    <p className='text-center fw-bolder fs-5 mt-3 ' style={{ fontStyle: "italic", color: "#9b9b9b" }}>Check Your Mail</p>

                                    <div>
                                        <Formik>
                                            <Formik initialValues={{
                                                confirmCode: '',
                                            }} onSubmit={async (values) => {
                                                var headerToken = `Bearer ${registerToken}`
                                                try {
                                                    const data = await axios.post('http://bexarehimli-001-site1.htempurl.com/api/Accounts/MailConfirm', values, { headers: { "Authorization": headerToken } })
                                                    setPage(3)
                                                } catch (error) {
                                                    setPage(4)
                                                }
                                            }}>
                                                {({ values }) => (
                                                    <Form>

                                                        <div className='d-flex'>

                                                            <Field type="number" className="login-input" name='confirmCode' placeholder="Your Confirm Code..." />
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
                                    <div style={{ padding: "10px 30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {
                                            localImg
                                        }
                                    </div>
                                    <p className='text-center fs-5 fw-bold mb-4' style={{ color: "#ffa900", marginTop: "-20px" }}>Your Email Confirmed!!!</p>
                                    <div className='text-center mb-3'>
                                        <button onClick={() => { setPage(1) }} className='back-register-btn'><GiBackwardTime style={{ fontSize: "25px", marginRight: "10px" }} />Back Register</button>
                                    </div>
                                </Modal.Body> :
                                page === 4 ?
                                    <Modal.Body>
                                        <div style={{ padding: "10px 30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {
                                                secondImg
                                            }
                                        </div>
                                        <p className='text-center fs-5 fw-bold mb-4' style={{ color: "#ffa900", marginTop: "10px" }}>Wrong Confirm Code!!!</p>
                                        <div className='text-center mb-3'>
                                            <button onClick={async () => {
                                                setPage(2)
                                                var headerToken = `Bearer ${registerToken}`
                                                const data = await axios.post('http://bexarehimli-001-site1.htempurl.com/api/Accounts/SendAgain', { confirmCode: "5678" }, { headers: { "Authorization": headerToken } })
                                            }} className='back-register-btn'><GiBackwardTime style={{ fontSize: "25px", marginRight: "10px" }} />Back Confirm</button>
                                        </div>
                                    </Modal.Body> : null


                }
            </Modal>
        </>
    );
}
export default RegisterModal;