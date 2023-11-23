'use client'
import { decryptData } from '@/utils/encryptdycrpt'
import React from 'react'
import { createContext, useState } from 'react'



export const userContext = createContext(null)


function LoginProvider({ children }) {
    const [user, setUser] = useState([{ id: '', email: '', firstName: '', lastName: '' }])

    const [accessToken, setAccessToken] = useState(decryptData('access'))


    const addUser = ({ newUser }) => {
        setUser([...user, newUser])
    }
    return (
        <userContext.Provider value={{ user, addUser, accessToken, setAccessToken }}>
            {children}
        </userContext.Provider>
    )
}

export default LoginProvider

