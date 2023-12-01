import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { JwtPayload, jwtDecode } from 'jwt-decode'

export const RequiredAuth = () => {
    const { refreshToken } = useAuth()

    const location = useLocation()

    if (refreshToken === null) {
        return <Navigate to='/login' />
    } else {
        let isExpired: boolean

        const refresh: JwtPayload = jwtDecode(refreshToken)
        if (refresh) {
            isExpired = dayjs.unix(refresh.exp).diff(dayjs()) < 1
        } else {
            isExpired = true
        }

        return !isExpired ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    }
}
