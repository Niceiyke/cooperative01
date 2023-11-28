// Profile.js
import React, { useState } from 'react';

const Profile = () => {
    const [avatarUrl, setAvatarUrl] = useState(''); // You can initialize this with the user's actual avatar URL
    const [firstName, setFirstName] = useState('John'); // Replace this with the user's actual first name
    const [lastName, setLastName] = useState('Doe'); // Replace this with the user's actual last name
    const [username, setUsername] = useState('johndoe'); // Replace this with the user's actual username
    const [bio, setBio] = useState('Web Developer'); // Replace this with the user's actual bio
    const [bankName, setBankName] = useState('Sample Bank'); // Replace this with the user's actual bank name
    const [accountNumber, setAccountNumber] = useState('********1234'); // Replace this with the user's actual account number
    const [email, setEmail] = useState('john.doe@example.com'); // Replace this with the user's actual email
    const [phoneNumber, setPhoneNumber] = useState('+1 (123) 456-7890'); // Replace this with the user's actual phone number

    const handleAvatarChange = (event) => {
        // Handle avatar changes, e.g., uploading a new avatar
        const newAvatarUrl = event.target.value; // Replace this with your actual logic to get the new avatar URL
        setAvatarUrl(newAvatarUrl);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-center">
                <img
                    src={avatarUrl || 'default-avatar.jpg'} // Use a default avatar if no custom avatar is set
                    alt="User Avatar"
                    className="rounded-full w-32 h-32 border-4 border-white shadow-lg"
                />
            </div>
            <div className="text-center mt-4">
                <h1 className="text-3xl font-bold">{`${firstName} ${lastName}`}</h1>
                <p className="text-gray-600">@{username}</p>
                <p className="text-gray-600">{bio}</p>
            </div>
            <div className="mt-6">
                <label htmlFor="avatar" className="text-gray-700">
                    Change Avatar
                </label>
                <input
                    type="file"
                    id="avatar"
                    className="block w-full mt-1 p-2 border rounded-md"
                    onChange={handleAvatarChange}
                    accept="image/*"
                />
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-bold">Bank Information</h2>
                <p className="text-gray-700">{`Bank: ${bankName}`}</p>
                <p className="text-gray-700">{`Account Number: ${accountNumber}`}</p>
                {/* Add more fields as needed */}
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-bold">Contact Information</h2>
                <p className="text-gray-700">{`Email: ${email}`}</p>
                <p className="text-gray-700">{`Phone Number: ${phoneNumber}`}</p>
                {/* Add more fields as needed */}
            </div>
        </div>
    );
};

export default Profile;
