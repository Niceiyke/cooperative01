
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


export const RequiredAuth = () => {
    const auth = useAuth()
    const location = useLocation()
    return (
        auth?.user?.user_id ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    )
}
