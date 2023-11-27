{/*
//'use client'
import axios from 'axios';
import decryptData from './encryptdycrpt';
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode';


const accessToken = decryptData('access')
const refresh = decryptData('refresh')
console.log('token', accessToken)

console.log('token', refresh)


export const axiosInstance = axios.create({
    // Configuration
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 8000,
    headers: {
        //Authorization: `Bearer `,
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`
    },

});

axiosInstance.interceptors.request.use(async req => {

    const user = jwtDecode(accessToken)

    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    console.log(isExpired)

    return req



})
*/}