import axios from '../api/Axios'


export const  enquiryForm =(enquiryData)=>axios.post('/enquiry',enquiryData)