import axios from '../api/Axios'

export const adminLogin =(loginData)=>axios.post('/admin/login',loginData)

export const enquiry = ()=>axios.get('/admin/dashboard')

export const deleteEnquiry =(id)=>axios.delete(`/admin/delete-enquiry/${id}`)

export const logout =(refToken)=>axios.post('/admin/logout',{refToken})

export const refreshTokens =(refToken)=>axios.post('/admin/refresh-token',{refToken})