import React, { useState } from 'react';
import UserNameInput from './UserNameInput';
import JobNameInput from './JobNameInput';
import { UserResponse } from '@/types/User';
import AddedUser from './AddedUser';

interface AddUserFormProps { }

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
        body: JSON.stringify({ name, job }),
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

    if (!userName.trim() || !jobName.trim()) {
      console.error('Please fill out all fields');
      return;
    }

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

  const isFormValid = userName.trim() && jobName.trim();

  return (
    <div className='flex flex-col m-4 rounded-md p-4 bg-blue-500'>
      <form className='space-x-2 flex items-center' onSubmit={handleSubmit}>
        <UserNameInput value={userName} handleSearch={setUserName} />
        <JobNameInput value={jobName} handleSearch={setJobName} />
        <button
          className={`disabled:bg-blue-300 px-4 py-2 bg-blue-50 text-blue-500 rounded-md ${loading || !isFormValid ? 'cursor-not-allowed' : ''
            }`}
          type='submit'
          disabled={loading || !isFormValid}
        >
          {loading ? <div className='animate-spin' /> : 'Add User'}
        </button>
      </form>

      {addedUser && <AddedUser addedUser={addedUser} />}
    </div>
  );
};

export default AddUserForm;
