import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchGet from '../hooks/useFetchGet';
import useFetchPost from '../hooks/useFetchPost';
import { useAuth } from '../hooks/useAuth';
import InputField from './InputField';


type  ContributionFormData = {
    monthly_contribution: number;
}



function Contribution() {

    const {user} =useAuth()

    const [contribution, setContribution] = useState<number>(0);

    const [formData, setFormData] = useState<ContributionFormData>({
        monthly_contribution:0

    });

    const apiFetch = useFetchGet();
    const apiPost = useFetchPost();
    const [error, setError] = useState<string | undefined>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchContribution = async () => {
            const response = await apiFetch(`/member-contribution/${user.member}`);
            setContribution(response.monthly_contribution);
        };

        fetchContribution();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleContribution = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await apiPost(`/member-contribution/${user.member}`,'PUT',formData);

            if (response.response.ok) {
                navigate('/dashboard');

            } else {
                setError('Error Updating Your Contribution, Try Again later.');
                console.error('Contribution Faild failed');
                throw new Error('some message');
            }
        } catch (error) {
            console.error('Error during Login:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-800 p-8 rounded shadow-md text-white w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Change Contribution</h2>
                <p className="text-red-500 font-extralight text-center">{error}</p>
                <form onSubmit={handleContribution}>
                    <InputField
                        label="Old Amount"
                        id="oldamount"
                        type="number"
                        value={contribution}
                        onChange={handleChange}
                        placeholder="Old Amount"
                        required
                    />
                    <InputField
                        label="New Amount"
                        id="monthly_contribution"
                        type="number"
                        value={formData.monthly_contribution}
                        onChange={handleChange}
                        placeholder="New Amount"
                        required
                    />
                    <div className="mb-6">
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Contribute
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contribution;
