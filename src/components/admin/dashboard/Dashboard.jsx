import React, { useEffect, useState } from 'react'
import { deleteEnquiry, enquiry, refreshTokens } from '../../../api/AdminRequest'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function Dashboard() {

  const [enquiryData, setEnquiryData] = useState([])
  const [change, setChange] = useState(false)
  const cookies = new Cookies();



  const detail = async () => {
    try {
      const { data } = await enquiry()
      setEnquiryData(data)
    } catch (error) {

      if (error.response.status === 401 && error.response.data.message.message === 'jwt expired') {
        const refToken = localStorage.getItem("refToken")
        const { data } = await refreshTokens(refToken)
        console.log(data);
        localStorage.setItem("refToken", data.refreshToken)
        cookies.set('accessToken', data.accessToken, { path: '/' });
        setChange(!change)
      } else {
        toast(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    detail()
  }, [change])

  const handelDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const { data } = await deleteEnquiry(id)
              console.log(data);
              if (data.success) {
                toast.success('Enquiry deleted', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                setChange(!change)
              }
            } catch (error) {
              console.log(error);
              if (error.response.status === 401 && error.response.data.message.message === 'jwt expired') {
                const refToken = localStorage.getItem("refToken")
                const { data } = await refreshTokens(refToken)
                console.log(data);
                localStorage.setItem("refToken", data.refreshToken)
                cookies.set('accessToken', data.accessToken, { path: '/' });
                setChange(!change)
              } else {
                toast(error.response.data.message)
              }

            }
          }
        },
        {
          label: 'No',
        }
      ]
    });


  }

  return (

    <div className='w-full'>
      <div className="bg-white p-8 rounded-md  ">

        <div className=" flex items-center justify-between pb-6 ">

          <div>
            <h2 className="text-gray-600 font-semibold">ENQUIRY LIST</h2>
            {/* <span className="text-xs">Pending Companies</span> */}
          </div>
          <div className="flex items-center justify-between">

          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>

                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                     no.
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>

                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Enquiry
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {
                    enquiryData.map((obj, index) => {

                      return (

                        <tr>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {index+1}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {obj.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {obj.email}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {obj.phone}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {obj.enquiry}
                            </p>
                          </td>
                          <td className='flex m-3'>

                            <button className='border w-full  my-1 py-2 px-2 rounded-full  bg-[#1b1b40] hover:bg-[#3c3264] relative text-white' onClick={(e) => { handelDelete(obj._id) }}>Delete</button>
                          </td>

                        </tr>
                      )
                    })
                  }




                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div >

  )
}

export default Dashboard