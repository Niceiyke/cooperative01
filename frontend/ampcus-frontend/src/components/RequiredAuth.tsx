
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'



export const RequiredAuth = () => {
    const { accessToken } = useAuth()
    const location = useLocation()

    let isExpired

    if (accessToken) {
        const user = jwtDecode(accessToken)
        isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    }
    else {
        isExpired = true
    }


    return (
        !isExpired ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    )
}
