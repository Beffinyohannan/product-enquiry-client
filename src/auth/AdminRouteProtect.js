import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRouteProtect=()=> {
    let auth = {'token':localStorage.getItem('refToken')} 
    return (
      auth.token ? <Outlet/> : <Navigate to={"/admin-login"} />
    )
}

export default AdminRouteProtect