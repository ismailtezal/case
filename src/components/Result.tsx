import { useCallback, useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

import Card from './Card';
import PaginationControl from './PaginationControl';
import SearchInput from './SearchInput';
import { User } from '@/types/User';
import axios from 'axios';
import { usePagination } from '@/hooks/usePagination';
import { PageResponse } from '@/types/PageResponse';


const useFetchData = (query: ParsedUrlQuery) => {
  const [data, setData] = useState<User[]>([]);
  const [originalData, setOriginalData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const page = query['page'] ?? '1';
      const per_page = query['per_page'] ?? '5';
      const url = `https://reqres.in/api/users?page=${page}&per_page=${per_page}`;

      try {
        const response = await axios.get<PageResponse>(url);
        const jsonData: PageResponse = response.data;
        setOriginalData(jsonData.data);
        setData(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return { data, originalData, setData };
};



const Result = () => {
  const router = useRouter();
  const { query } = router;
  const { data, originalData, setData } = useFetchData(query as ParsedUrlQuery);
  const { currentPage, handlePreviousPage, handleNextPage } = usePagination(data, router);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchMessage, setSearchMessage] = useState<string>('');

  const handleSearch = useCallback(async (searchValue: string) => {
    setSearchInput(searchValue);

    if (searchValue.trim() === '') {
      setData(originalData);
      setSearchMessage('');
    } else {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${searchValue}`);
        const user = response.data.data;
        setData(user ? [user] : []);
        setSearchMessage(user ? '' : 'No user with this ID found.');
      } catch (error) {
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
