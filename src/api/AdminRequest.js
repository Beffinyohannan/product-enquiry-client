import axios from '../api/Axios'
import axiosJWT from './AuthAxios'

export const adminLogin =(loginData)=>axios.post('/admin/login',loginData)

export const enquiry = ()=>axiosJWT.get('/admin/dashboard')

export const deleteEnquiry =(id)=>axiosJWT.delete(`/admin/delete-enquiry/${id}`)

export const logout =(refToken)=>axios.post('/admin/logout',{refToken})

export const refreshTokens =(refToken)=>axios.post('/admin/refresh-token',{refToken})