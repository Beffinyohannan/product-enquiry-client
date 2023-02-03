import React from 'react'
import { logout } from '../../../api/AdminRequest';
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


function Navbar() {
    const navigate = useNavigate()
    const cookies = new Cookies();

    
    const handleLogout =(()=>{
        
            const refToken = localStorage.getItem("refToken")
            console.log(refToken,'12345');

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to Logout.',
            buttons: [
              {
                label: 'Yes',
                onClick: async() => {
                    try {
                        const {data} =await logout(refToken)
                        console.log(data);
                        if(data.success){
                            localStorage.removeItem('refToken')
                            cookies.remove('accessToken')
                            navigate('/admin-login')
                        }
                    } catch (error) {
                       console.log(error);
                    }
                }
              },
              {
                label: 'No',
              }
            ]
          });
        
    })
   

    return (
        <div>
            <nav className="flex items-center justify-between flex-wrap  bg-gradient-to-b from-[#151425] to-[#3c3b62] p-6 ">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    {/* <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg> */}
                    <span className="font-semibold text-xl tracking-tight">Admin Dashboard</span>
                </div>
                <div>
                    <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white font-semibold mt-4 lg:mt-0" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar