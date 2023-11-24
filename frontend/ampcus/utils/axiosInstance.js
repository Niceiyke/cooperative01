//'use client'
import axios from 'axios';
import decryptData from './encryptdycrpt';


const token = decryptData('access')
console.log(token)
console.log(String(token))
export const axiosInstance = axios.create({
    // Configuration
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 8000,
    headers: {
        //Authorization: `Bearer `,
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    },

});