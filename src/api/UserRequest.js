import axios from '../api/Axios'

export const  enquiryForm =(enquiryData,currentLocation)=>axios.post('/enquiry',{enquiryData,currentLocation})