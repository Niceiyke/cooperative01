'use client'
import React from 'react'
import { createContext, useState } from 'react'



export const userContext = createContext(null)


function LoginProvider({ children }) {
    const [user, setUser] = useState([{ id: '', email: '', firstName: '', lastName: '' }])


    const addUser = ({ newUser }) => {
        setUser([...user, newUser])
    }
    return (
        <userContext.Provider value={{ user, addUser }}>
            {children}
        </userContext.Provider>
    )
}

export default LoginProvider

