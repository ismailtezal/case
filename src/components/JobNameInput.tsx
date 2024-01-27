import React from 'react';
import Input from './Input';

interface JobNameInputProps {
    value: string;
    handleSearch: (value: string) => void;
}

const JobNameInput: React.FC<JobNameInputProps> = ({ value, handleSearch }) => {
    return (
        <Input
            type="text"
            value={value}
            onChange={(newValue) => handleSearch(newValue)} 
            placeholder="Job name"
        />
    );
};

export default JobNameInput;
