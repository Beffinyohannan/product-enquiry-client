import React, { useState } from 'react'
import { enquiryForm } from '../../../api/UserRequest'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const fetchedImgSrc = "https://dragon2000-multisite.s3.eu-west-2.amazonaws.com/wp-content/uploads/sites/142/2021/01/07101841/Warranty-Banner-1.jpg"

function ProductEnquiry() {
    const initialValues = { name: "", email: "", phone: "", enquiry: "" }
    const [formValues, setFormValues] = useState(initialValues)
    // const [currentLocation,setCurrentLocation] = useState()
    const [error, setError] = useState({});

    const enquiryData = {
        ...formValues
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    // const getLocation = async()=>{
    //     const location = await axios.get('https://ipapi.co/json')
    //     // console.log(location.data,'function')
    //     setCurrentLocation(location.data)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = validateForm(enquiryData)
        setError(errors)
        if (Object.keys(errors).length === 0) {
            try {
                // await getLocation()
                // console.log(currentLocation,'c')
                const { data } = await enquiryForm(enquiryData)
                console.log(data);
                if (data.success){
                    toast.success('Enquiry Subimtted Sucessfully', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                   
                    setFormValues({name:'',email:'',phone:'',enquiry:''})
    
                }
            } catch (error) {
                console.log(error)
                toast (error.response.data.message)
            }

           

        }

    }

    const validateForm = (data) => {
        const error = {};
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const space = /^\s/

        if (!data.name) {
            error.name = "Name required"
        }else if(space.test(data.name)){
            error.name = "Enter valid name"
        }

        if (!data.email) {
            error.email = "Email required"
        } else if (!regex.test(data.email)) {
            error.email = "Enter valide email address"
        }

        if (!data.phone) {
            error.phone = "phone required"
        }else if (data.phone.length !== 10) {
            error.phone = "Phone number should be 10 digit"
        }else if(space.test(data.phone)){
            error.phone = "Enter valid number"
        }

        if (!data.enquiry) {
            error.enquiry = "Enquiry required"
        }else if(space.test(data.enquiry)){
            error.enquiry = "Enter valid message"
        }

        return error;
    }

    return (

        
        <div className="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url(${fetchedImgSrc})` }} >
            {/* <div className="hidden md:block absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div> */}
            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                    <div className=" hidden lg:flex flex-col  text-white">
                        <h1 className="mb-3 font-bold text-5xl">Hi..</h1>
                        <h1 className="mb-3 font-bold text-5xl">We Produce Great Content, Fast.  </h1>
                        <p className="pr-3">Talk with one of our content experts about our hand-vetted expert content writers & designers who can help you scale your content marketing efforts quickly.</p>
                    </div>
                </div>
                <div className="flex justify-center items-center  z-10">
                    <div className="p-12 bg-white mx-auto  rounded-2xl w-full ">
                        <div className="mb-4">
                            <h3 className="font-semibold text-2xl text-gray-800">Product Enquiry </h3>
                            <p className="text-gray-500">Please fill the details</p>
                        </div>
                        <div className="space-y-5 ">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ">Name</label>
                                    <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" name='name' type="text" value={formValues.name}  onChange={handleChange} placeholder="name" />
                                    <p className='text-red-500'>{error.name}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ">Email</label>
                                    <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" name='email' type="email" value={formValues.email} onChange={handleChange} placeholder="mail@gmail.com" />
                                    <p className='text-red-500'>{error.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ">Phone</label>
                                    <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" name='phone' type="tel" value={formValues.phone} onChange={handleChange} placeholder="8128538965" />
                                    <p className='text-red-500'>{error.phone}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ">Enquiry</label>
                                    <textarea className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" name='enquiry' type="text" value={formValues.enquiry} onChange={handleChange} placeholder="What would you like to know ?" />
                                    <p className='text-red-500'>{error.enquiry}</p>
                                </div>
                                

                                <div>
                                    <button type="submit" className="w-full flex justify-center bg-[#1b1b40] hover:bg-[#3c3264] text-white p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Submit Enquiry
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProductEnquiry