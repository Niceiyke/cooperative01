"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/useUser';
import { encryptData } from '@/utils/encryptdycrpt';

// InputField component
const InputField = ({ label, id, type, value, onChange, placeholder, required }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block font-medium">
            {label}
        </label>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

const Login = () => {
    const { user, setAccessToken } = useUser()
    const navigate = useRouter()



    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e) => {

        e.preventDefault();


        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                credentials: 'include',

                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const token = await response.json()
                const access_token = token.access

                encryptData('access', access_token)

                setAccessToken(access_token)
                //console.log(access_token)



                console.log('Login successful');
                navigate.push('/dashboard')
            } else {

                // Handle Login failure
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during Login:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-800 p-8 rounded shadow-md text-white w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;