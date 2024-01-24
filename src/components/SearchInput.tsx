import React from 'react';
import { ChangeEvent } from 'react';

interface SearchInputProps {
    searchInput: string;
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchInput, handleSearch }) => {
    return (
        <div className="flex items-center justify-end">
            <input
                type="text"
                value={searchInput}
                onChange={handleSearch}
                placeholder="Search User by ID"
                className="rounded-md px-4 py-2 w-full md:w-64   focus:outline-none focus:bg-blue-100"
            />
        </div>
    );
};

export default SearchInput;
