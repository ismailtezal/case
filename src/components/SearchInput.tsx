import React from 'react';
import { ChangeEvent } from 'react';
import Input from './Input';

interface SearchInputProps {
    searchInput: string;
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchInput, handleSearch }) => {
    return (

        <div className='flex items-center justify-end'>
            <Input
                type="text"
                value={searchInput}
                onChange={handleSearch}
                placeholder="Search User by ID"
                className='items-center justify-end'
                />
                
        </div>
    );
};

export default SearchInput;
