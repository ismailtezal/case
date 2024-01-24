import React from 'react';

interface User {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface CardProps {
    data: User[];
}

const Card: React.FC<CardProps> = ({ data }) => {
    return (
        <>
            {data.length > 0 ? (
                data.map((user: User) => (
                    <div className='flex items-center space-x-4 ring bg-blue-400 px-4 py-3 rounded-lg shadow-md' key={user.id}>
                        <img
                            src={user.avatar}
                            width={48}
                            alt={`${user.first_name} ${user.last_name}`}
                            className='rounded-full flex-shrink-0 object-cover w-12 h-12'
                        />
                        <div className='flex-grow flex flex-col justify-center'>
                            <p className='text-white font-semibold text-lg'>{`${user.first_name} ${user.last_name}`}</p>
                            <p className='text-gray-200 text-sm md:text-base drop-shadow'>{user.email}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className='flex justify-center'>
                <p className="text-white text-2xl">No user found with this id.</p>
                </div>
            )}
        </>
    );
};

export default Card;
