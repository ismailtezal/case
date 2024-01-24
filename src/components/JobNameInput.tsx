import React from 'react';
import Input from './Input';

interface JobNameInputProps {
    value: string;
    handleSearch: React.Dispatch<React.SetStateAction<string>>;
}

const JobNameInput: React.FC<JobNameInputProps> = ({ value, handleSearch }) => {
    return (
        <Input
            type="text"
            value={value}
            onChange={(event) => handleSearch(event.target.value)} 
            placeholder="Job name"
        />
    );
};

export default JobNameInput;
