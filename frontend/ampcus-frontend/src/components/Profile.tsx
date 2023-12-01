
import React, { useReducer, ChangeEvent } from 'react';

interface ProfileProps { }

interface ProfileState {
    avatarUrl: string;
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    bankName: string;
    accountNumber: string;
    email: string;
    phoneNumber: string;
}

type ProfileAction =
    | { type: 'SET_AVATAR'; payload: string }
    | { type: 'SET_FIRST_NAME'; payload: string }
    | { type: 'SET_LAST_NAME'; payload: string }
    | { type: 'SET_USERNAME'; payload: string }
    | { type: 'SET_BIO'; payload: string }
    | { type: 'SET_BANK_NAME'; payload: string }
    | { type: 'SET_ACCOUNT_NUMBER'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PHONE_NUMBER'; payload: string };

const initialState: ProfileState = {
    avatarUrl: '',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    bio: 'Web Developer',
    bankName: 'Sample Bank',
    accountNumber: '********1234',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (123) 456-7890',
};

const profileReducer = (state: ProfileState, action: ProfileAction): ProfileState => {
    switch (action.type) {
        case 'SET_AVATAR':
            return { ...state, avatarUrl: action.payload };
        case 'SET_FIRST_NAME':
            return { ...state, firstName: action.payload };
        case 'SET_LAST_NAME':
            return { ...state, lastName: action.payload };
        case 'SET_USERNAME':
            return { ...state, username: action.payload };
        case 'SET_BIO':
            return { ...state, bio: action.payload };
        case 'SET_BANK_NAME':
            return { ...state, bankName: action.payload };
        case 'SET_ACCOUNT_NUMBER':
            return { ...state, accountNumber: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PHONE_NUMBER':
            return { ...state, phoneNumber: action.payload };
        default:
            return state;
    }
};

const Profile: React.FC<ProfileProps> = () => {
    const [state, dispatch] = useReducer(profileReducer, initialState);

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_AVATAR', payload: event.target.value });
    };

    // Create similar functions for other fields

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

