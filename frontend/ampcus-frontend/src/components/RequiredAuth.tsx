import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'



export const RequiredAuth = () => {
    const { user } = useAuth()
    const location = useLocation()

    let isExpired: boolean

    if (user) {

        isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    }
    else {
        isExpired = true
    }


    return (
        !isExpired ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    )
}
