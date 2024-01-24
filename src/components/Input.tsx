import React, { ChangeEvent } from 'react';

interface InputProps {
    type: string;
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    type,
    className = '',
    placeholder = '',
    value = '',
    onChange,
}) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:bg-blue-100 ${className}`}
            />
        </>
    );
};

export default Input;
