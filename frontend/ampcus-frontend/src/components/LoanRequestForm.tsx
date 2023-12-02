
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetchPost';
import { useAuth } from '../hooks/useAuth';
import InputField from './InputField';

interface FormData {
    borrowed_amount: string;
    loan_type: string | number;
    member: any; // Adjust the type based on your actual user/member type
}

function LoanRequestForm() {
    const navigate = useNavigate();
    const { user } = useAuth()
    const api = useFetch();
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        borrowed_amount: '',
        loan_type: '',
        member: user?.member,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setError('');
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleLoanRequest = async (e: FormEvent) => {
        e.preventDefault();

        if (formData['loan_type'] === 'jumbo') {
            formData['loan_type'] = '1';
        }
        if (formData['loan_type'] == "education") {
            formData['loan_type'] = 2
        }
        if (formData['loan_type'] == "emergency") {
            formData['loan_type'] = 3
        }
        if (formData['loan_type'] == "food_item") {
            formData['loan_type'] = 4
        }
        if (formData['loan_type'] == "home_appliances") {
            formData['loan_type'] = 5
        }


        const response = await api('/loans/', 'POST', formData);

        if (response.response.status === 400 || response.response.status === 401) {
            console.log(response.error);
            setError(response.error[0]);
        } else if (response.response.status === 201) {
            console.log(response.data);
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-800 text-white p-8 rounded shadow-md w-full sm:w-96">
                <h3 className="mb-4 text-center">Loan Request Form</h3>
                {error ? <p className="text-red-500 font-medium">{error}</p> : ''}
                <form onSubmit={handleLoanRequest}>
                    <div className="mb-2">
                        <label htmlFor="loan_type" className="block font-medium">
                            Loan Type:
                        </label>
                        <select
                            id="loan_type"
                            name="loan_type"
                            value={formData.loan_type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded text-gray-950"
                        >
                            <option value="" disabled>
                                Select Loan Type
                            </option>
                            <option value="jumbo">Jumbo Loan</option>
                            <option value="education">Education Loan</option>
                            <option value="emergency">Emergency Loan</option>
                            <option value="food_item">Food Item</option>
                            <option value="home_appliances">Home Appliances</option>

                        </select>
                    </div>
                    <InputField
                        label="Amount"
                        id="borrowed_amount"
                        type="number"
                        value={formData.borrowed_amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        required
                    />

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoanRequestForm;
