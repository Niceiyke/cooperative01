
import { useNavigate } from 'react-router-dom';
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

const Signup = () => {
    const navigate =useNavigate()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        sap_number: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };


    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful signup

                navigate('/login')
            } else {
                // Handle signup failure
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-800 text-white p-8 rounded shadow-md w-full sm:w-96">
                <h3 className="mb-4 text-center">Register</h3>
                <form onSubmit={handleSignup}>
                    <InputField
                        label="First Name"
                        id="first_name"
                        type="text"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                    <InputField
                        label="Last Name"
                        id="last_name"
                        type="text"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
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
                        label="Sap Number"
                        id="sap_number"
                        type="number"
                        value={formData.sap_number}
                        onChange={handleChange}
                        placeholder="Sap Number"
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
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
