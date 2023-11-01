import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


const ResetPasword = () => {
  const { id } = useParams();
  const { token } = useParams();

  const navigator = useNavigate();

  return (
    <div className='mt-5 my-container py-4 ' style={{ margin: "0 auto" }}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#ffa900',
            color: '#fff',
            marginTop: "70px"
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <div>
        <p className="title-profile">
          Reset Password
        </p>

        <Formik>
          <Formik initialValues={{
            newPassword: '',
            againPassword: "",
            userId: id,
            token: token
          }} onSubmit={async (values) => {
            axios.post("http://bexarehimli-001-site1.htempurl.com/api/Accounts/ResetPassword", values).then(res =>toast.success("Your password has been updated"), navigator("/")).catch(err => navigator("/error"))
          }}>
            {({ values }) => (
              <Form>

                <div className='text-start mt-5'>
                  <label htmlFor="" className='reset-label'>New Password</label> <br />
                  <Field required type="password" className="login-input mt-0" name='newPassword' placeholder="New Password" />
                </div>
                <div className='text-start mt-5' >
                  <label htmlFor="" className='reset-label' >Again Password</label> <br />
                  <Field required type="password" className="login-input mt-0" name='againPassword' placeholder="Again Password" />
                </div >
                <button type='submit' className='btn login-btn register-btn form-control '>Register</button>
              </Form>
            )}
          </Formik>

        </Formik>
      </div>
    </div>
  )
}

export default ResetPasword