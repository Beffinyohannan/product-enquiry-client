import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { adminLogin } from '../../../api/AdminRequest';
// import Cookies from 'universal-cookie';
 



const fetchedImgSrc = "https://dragon2000-multisite.s3.eu-west-2.amazonaws.com/wp-content/uploads/sites/142/2021/01/07101841/Warranty-Banner-1.jpg"


function AdminLogin() {
  const initialValues = { email: "", password: "" }
  const [formValues, setFormValues] = useState(initialValues)
  const navigate = useNavigate()
  // const cookies = new Cookies();


  const [error, setError] = useState({});

  const loginData = {
    ...formValues
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateForm(loginData)
    setError(errors)
    if (Object.keys(errors).length === 0) {
      try {
        const { data } = await adminLogin(loginData)
        console.log(data);
        if (data.success) {
          localStorage.setItem("refToken", data.refreshToken)
          // cookies.set('accessToken', data.accessToken, { path: '/' });
          

          navigate("/admin-dashboard")
        }
      } catch (error) {
        console.log(error);

      }




    }

  }

  const validateForm = (data) => {
    const error = {};
    // const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!data.email) {
      error.email = "email required"
    } else if (!regex.test(data.email)) {
      error.email = "enter valide email address"
    }

    if (!data.password) {
      error.password = "password required"
    } else if (data.password.length < 5) {
      error.password = "password should be 5 digit"
    }

    return error;
  }


  return (
    <div>

      <div className="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url(${fetchedImgSrc})` }} >
        {/* <div className="hidden md:block absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div> */}
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className=" hidden lg:flex flex-col  text-white">
              <h1 className="mb-3 font-bold text-5xl">Hi..</h1>
              <h1 className="mb-3 font-bold text-5xl"> Welcome to Admin-side  </h1>
              {/* <p className="pr-3">Lorem ipsum is placeholder text commonly used in the graphic, print,
                and publishing industries for previewing layouts and visual mockups</p> */}
            </div>
          </div>
          <div className="flex justify-center items-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5 ">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ">Email</label>
                    <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" name='email' type="text" value={formValues.email} onChange={handleChange} placeholder="mail@gmail.com" />
                    <p className='text-red-500'>{error.email}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 ">
                      Password
                    </label>
                    <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" name='password' type="password" value={formValues.password} onChange={handleChange} placeholder="Enter your password" />
                    <p className='text-red-500'>{error.password}</p>
                  </div>

                  <div>
                    <button type="submit" className="w-full flex justify-center  bg-[#1b1b40] hover:bg-[#3c3264] text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin