import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import UserNameInput from './UserNameInput';
import JobNameInput from './JobNameInput';

interface UserResponse {
  id: number;
  name: string;
  job: string;
  createdAt: string;
}

interface AddUserFormProps {}

const AddUserForm: React.FC<AddUserFormProps> = () => {
  const [userName, setUserName] = useState('');
  const [jobName, setJobName] = useState('');
  const [loading, setLoading] = useState(false);
  const [addedUser, setAddedUser] = useState<UserResponse | null>(null);

  const onSubmit = async (name: string, job: string): Promise<UserResponse> => {
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          job: job,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await onSubmit(userName, jobName);
      setAddedUser(response);
    } catch (error: any) {
      console.error(`Error: ${error.message || 'Failed to add user'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col m-4 rounded-md p-4 bg-blue-500 '>
      <form className='space-x-2 flex items-center' onSubmit={handleSubmit}>
        <UserNameInput value={userName} handleSearch={setUserName} />
        <JobNameInput value={jobName} handleSearch={setJobName} />
        <button className='px-4 py-2 bg-blue-50 text-blue-500 rounded-md' type='submit' disabled={loading}>
          {loading ? <Loader className='animate-spin' /> : 'Add User'}
        </button>
      </form>

    {addedUser && (
        <div className='mt-4 text-white'>
            <h3 className='text-lg font-bold'>Added User</h3>
            <div className='flex flex-col'>
                <div className='flex'>
                    <span className='font-bold'>Id:</span>
                    <span className='ml-2'>{addedUser.id}</span>
                </div>
                <div className='flex'>
                    <span className='font-bold'>Name:</span>
                    <span className='ml-2'>{addedUser.name}</span>
                </div>
                <div className='flex'>
                    <span className='font-bold'>Job:</span>
                    <span className='ml-2'>{addedUser.job}</span>
                </div>
                <div className='flex'>
                    <span className='font-bold'>Created At:</span>
                    <span className='ml-2'>{new Date(addedUser.createdAt).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )}
    </div>
  );
};

export default AddUserForm;
