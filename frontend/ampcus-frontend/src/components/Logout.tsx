import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom'

function Logout() {
    const location = useLocation()
    const { logout } = useAuth()
    return (
        logout(),
        <Navigate to='/' state={{ from: location }
        } replace />

    )
}

export default Logout