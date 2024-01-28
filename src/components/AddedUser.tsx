import { UserResponse } from '@/types/User';
import React from 'react';

interface AddedUserProps {
    addedUser: UserResponse;
}

const AddedUser: React.FC<AddedUserProps> = ({ addedUser }) => {
    return (
        <div className='mt-4 text-white'>
            <h3 className='text-lg font-bold'>Added User</h3>
            <div className='flex flex-col'>
                <div className='flex items-center mb-2'>
                    <span className='font-bold mr-2'>Id:</span>
                    <span>{addedUser.id}</span>
                </div>
                <div className='flex items-center mb-2'>
                    <span className='font-bold mr-2'>Name:</span>
                    <span>{addedUser.name}</span>
                </div>
                <div className='flex items-center mb-2'>
                    <span className='font-bold mr-2'>Job:</span>
                    <span>{addedUser.job}</span>
                </div>
                <div className='flex items-center'>
                    <span className='font-bold mr-2'>Created At:</span>
                    <span>{new Date(addedUser.createdAt).toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default AddedUser;
