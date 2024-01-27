import { User } from "@/types/User";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export const usePagination = (data: User[], router: ReturnType<typeof useRouter>) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
  
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
  
    return { currentPage, handlePreviousPage, handleNextPage };
  };