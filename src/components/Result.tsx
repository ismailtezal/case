import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Card from './Card';
import PaginationControl from './PaginationControl';
import SearchInput from './SearchInput';
import { User } from '@/types/User';
import { ApiResponse } from '@/types/ApiResponse';
import axios from 'axios';

const Result = () => {
  const router = useRouter();
  const { query } = router;
  const [originalData, setOriginalData] = useState<User[]>([]);
  const [data, setData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchMessage, setSearchMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const page = query['page'] ?? '1';
      const per_page = query['per_page'] ?? '5';
      const url = `https://reqres.in/api/users?page=${page}&per_page=${per_page}`;

      try {
        const response = await fetch(url);
        const jsonData: ApiResponse = await response.json();
        setOriginalData(jsonData.data);
        setData(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      router.push(`/?page=${newPage}`);
      setCurrentPage(newPage);
    }
  }, [currentPage, router]);

  const handleNextPage = useCallback(() => {
    if (currentPage < data.length) {
      const newPage = currentPage + 1;
      router.push(`/?page=${newPage}`);
      setCurrentPage(newPage);
    }
  }, [currentPage, data.length, router]);

  const handleSearch = useCallback(async (searchValue: string) => {
    setSearchInput(searchValue);
  
    if (searchValue === '') {
      setData(originalData);
      setSearchMessage('');
    } else {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${searchValue}`);
        const user = response.data.data;
        setData(user ? [user] : []);
        setSearchMessage(user ? '' : 'No user with this ID found.');
      } catch (error) {
        console.error('No user with this ID found.', error);
        setData([]);
      }
    }
  }, [originalData]);

  return (
    <div className="flex flex-col gap-2 bg-blue-500 m-4 p-4 rounded-md shadow-md">
      <Card data={data} />
      <PaginationControl currentPage={currentPage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
      <SearchInput handleSearch={handleSearch} searchInput={searchInput} />
    </div>
  );
};

export default Result;
