import React from 'react';
import Input from './Input';

interface UserNameInputProps {
    value: string;
    handleSearch: React.Dispatch<React.SetStateAction<string>>;
}

const UserNameInput: React.FC<UserNameInputProps> = ({ value, handleSearch }) => {
    return (
        <Input
            type="text"
            value={value}
            onChange={(event) => handleSearch(event.target.value)} 
            placeholder="Name"
        />
    );
};

export default UserNameInput;
