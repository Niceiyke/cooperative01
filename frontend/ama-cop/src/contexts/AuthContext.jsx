import React from 'react'
import { createContext, useState } from 'react'
import decryptData from '../utils/encryptdycrpt'
import { useNavigate } from 'react-router-dom'



export const AuthContext = createContext(undefined)


function AuthProvider({ children }) {
    const [user, setUser] = useState(decryptData('user'))
    const [accessToken, setAccessToken] = useState(decryptData('access'))
    const [refreshToken, setRefreshToken] = useState(decryptData('refresh'))

    const navigate = useNavigate()


    const addUser = ({ newUser }) => {
        setUser([...user, newUser])
    }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')

    }
    return (
        <AuthContext.Provider value={{ user, accessToken, refreshToken, setRefreshToken, logout, addUser, setUser, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

