import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { encryptData } from '../utils/encryptdycrpt';

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

function Contribution() {
    const { setAccessToken, setRefreshToken, setUser } = useAuth()
    const [error, setError] = useState()

    const navigate = useNavigate()



    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setError('')

        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e) => {

        e.preventDefault();


        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                credentials: 'include',

                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const token = await response.json()
                const access_token = token.access
                const refresh_token = token.refresh

                encryptData('access', access_token)
                encryptData('refresh', refresh_token)
                const data = jwtDecode(access_token)
                encryptData('user', data)

                setUser(data)
                setAccessToken(access_token)
                setRefreshToken(refresh_token)

                navigate('/dashboard')

                console.log('Login successful')

            } else {

                // Handle Login failure
                setError('Incorrect email or password')
                console.error('Login failed');
                throw new Error('some message')


            }
        } catch (error) {
            console.error('Error during Login:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-800 p-8 rounded shadow-md text-white w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Change Contribution</h2>
                <p className='text-red-500 font-extralight text-center'>{error}</p>
                <form onSubmit={handleLogin}>
                    <InputField
                        label="Old Amount"
                        id="oldamount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Old Amount"
                        required
                    />
                    <InputField
                        label="New Amount"
                        id="amount"
                        type="number"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="New Amount"
                        required
                    />
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Change
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contribution