import React from 'react';
import Input from './Input';

interface UserNameInputProps {
    value: string;
    handleSearch: (value: string) => void; 
}

const UserNameInput: React.FC<UserNameInputProps> = ({ value, handleSearch }) => {
    return (
        <Input
            type="text"
            value={value}
            onChange={(newValue) => handleSearch(newValue)} 
            placeholder="Name"
        />
    );
};

export default UserNameInput;
