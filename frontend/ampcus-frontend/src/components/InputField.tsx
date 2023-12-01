import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    id,
    type,
    value,
    onChange,
    placeholder,
    required,
}) => (
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

export default InputField;
