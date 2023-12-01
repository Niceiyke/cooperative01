
import React, { useReducer, ChangeEvent } from 'react';
import { Member } from '../models/models';
import logo from '../assets/OIP2.jpg'

interface ProfileProps { }

// interface ProfileState {
//     avatarUrl: string;
//     firstName: string;
//     lastName: string;
//     username: string;
//     bio: string;
//     bankName: string;
//     accountNumber: string;
//     email: string;
//     phoneNumber: string;
// }
type ProfileAction =
    | { type: 'SET_AVATAR'; payload: string }
    | { type: 'SET_BANK_NAME'; payload: string }
    | { type: 'SET_ACCOUNT_NUMBER'; payload: string }
    | { type: 'SET_PHONE_NUMBER'; payload: string };

const initialState: Member = {
    id: 0,
    location: '',
    user: {
        first_name: 'Ikechukwu',
        last_name: 'Oyom',
        sap_number: '13659',
        email: 'iyke@ampcus.com',
    },
    monthly_contribution: 0,
    bank_name: 'Zenith Bank',
    bank_account: '200865848',
    total_contribution: 0,
    total_loan: 0,
    available_balance: 0,
    existing_loan: [
        {
            id: 1,
            loan_types: 2,
            date_approved: '',
            borrowed_amount: 1000,
            repaid_amount: 500,
            is_active: true,
        },
    ],
    avatarUrl: '',
};


const profileReducer = (state: Member, action: ProfileAction): Member => {
    switch (action.type) {
        case 'SET_AVATAR':
            return { ...state, avatarUrl: action.payload };
        case 'SET_BANK_NAME':
            return { ...state, bank_name: action.payload };
        case 'SET_ACCOUNT_NUMBER':
            return { ...state, bank_account: action.payload };
        case 'SET_PHONE_NUMBER':
            return { ...state, /* Add logic to update phone number */ };
        default:
            return state;
    }
};
const Profile: React.FC<ProfileProps> = () => {
    const [state, dispatch] = useReducer(profileReducer, initialState);

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_AVATAR', payload: event.target.value });
    };


    return (
        <div className="container mx-auto p-4">
            {/*  <div className="mt-6">
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
            </div> */}
            <div className="flex flex-col items-center justify-center">
                <img
                    src={state.avatarUrl || logo} // Use a default avatar if no custom avatar is set
                    alt="User Avatar"
                    className="rounded-full w-32 h-32 border-4 border-white shadow-lg"
                />
                <h3 className="text-gray-700 mt-4">{`Location: Ama Brewery`}</h3>
            </div>
            <div className='md:flex gap-2 mt-4'>
                <div className='w-[50%] md:border-2 md:rounded-md md:pl-8'>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Personal Detail</h2>
                        <p className="text-gray-700">{`First Name: ${state.user.first_name}`}</p>
                        <p className="text-gray-700">{`Last Name:  ${state.user.last_name}`}</p>

                        <p className="text-gray-700">{`Sap Number: ${state.user.sap_number}`}</p>

                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Bank Detail</h2>
                        <p className="text-gray-700">{`Bank Name: ${state.bank_name}`}</p>
                        <p className="text-gray-700">{`Account Number: ${state.bank_account}`}</p>

                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Contact Detail</h2>
                        <p className="text-gray-700">{`Email: ${state.user.email}`}</p>
                        <p className="text-gray-700">{`Phone Number: ${state.user.sap_number}`}</p>

                    </div>

                </div>
                <div className='w-[50%] md:border-2 md:rounded-md md:pl-8'>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Contribution Detail</h2>
                        <p className="text-gray-700">{`Monthly Contribution: ${state.monthly_contribution}`}</p>
                        <p className="text-gray-700">{`Total Contribution: ${state.user.sap_number}`}</p>

                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Loans</h2>
                        <p className="text-gray-700">{`Total Loan Amount: ${state.total_loan}`}</p>
                        <p className="text-gray-700">{`Avaliable Loan Balance: ${state.available_balance}`}</p>
                        <p className="text-gray-700">{`Active Loan Count: ${state.existing_loan.length}`}</p>
                    </div>


                </div>
            </div>
           
        </div>
    );
};

export default Profile;

