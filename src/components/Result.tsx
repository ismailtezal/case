import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from './Card';
import PaginationControl from './PaginationControl';
import SearchInput from './SearchInput';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      router.push(`/?page=${newPage}`);
      setCurrentPage(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < data.length) {
      const newPage = currentPage + 1;
      router.push(`/?page=${newPage}`);
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    if (searchValue === '') {
      setData(originalData);
      setSearchMessage('');
    } else {
      const user = originalData.find((user) => user.id.toString() === searchValue);
      setData(user ? [user] : []);
      setSearchMessage(user ? '' : 'No user with this ID found.');
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-blue-500 m-4 p-4 rounded-md shadow-md">
      <Card data={data} />
      <PaginationControl currentPage={currentPage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
      <SearchInput handleSearch={handleSearch} searchInput={searchInput} />
    </div>
  );
};

export default Result;
