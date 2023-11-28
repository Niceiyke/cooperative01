import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode';

import React, { useContext } from 'react'
import { useAuth } from './useAuth';
import { encryptData } from '../utils/encryptdycrpt';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const useFetchPost = () => {

    const { accessToken, refreshToken, logout, setAccessToken, setRefreshToken } = useAuth(useContext)
    const location = useLocation()
    const navigation = useNavigate()

    let config = {}

    const BASEURL = 'http://127.0.0.1:8000/api'

    const NewAccessToken = async (refresh) => {
        try {

            const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 'refresh': refresh })
            })

            if (response.status === 200) {
                const token = await response.json()

                const access_token = token.access

                encryptData('access', access_token)
                encryptData('user', jwtDecode(access_token))
                return access_token

            }
        } catch (error) {

        }


    }

    const originalRequest = async (url, formdata) => {
        const url2 = `${BASEURL}${url}`

        let error 
        let data

        const response = await fetch(url2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(formdata)
        })


        if (response.status == 400) {
            error = await response.json()
            console.log('error1',error)

            return { response, data, error }

        }
        if (response.status == 401) {
            error = await response.json()
            console.log('error2', error)


            return { response, data, error }

        }

       else{
            data = await response.json()
            console.log(data)

            return { response, data, error }

        }


    }


    const callFetch = async (url, formdata) => {

        const user = jwtDecode(accessToken)
        const isExpiredAccessToken = dayjs.unix(user.exp).diff(dayjs()) < 1

        const refresh = jwtDecode(refreshToken)
        const isExpiredRefreshToken = dayjs.unix(refresh.exp).diff(dayjs()) < 1

        if (isExpiredRefreshToken) {

            console.log('refresh expired')
            logout()
            navigation('/login')
        }

        if (isExpiredAccessToken) {

            console.log('token expired')
            const access_token = await NewAccessToken(refreshToken)
            console.log('token updated')



            config['headers'] = {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${access_token}`
            }

            const response = await originalRequest(url, formdata)


            return response
        }

        else {
            const response = await originalRequest(url, formdata)

            return response
        }
    }





    return callFetch
}

export default useFetchPost