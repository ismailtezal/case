import { ChevronRight, ChevronLeft } from "lucide-react";
import Button from "./Button";

interface PaginationControlProps {
    currentPage: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({ currentPage, handlePreviousPage, handleNextPage }) => {
    return (
        <div className='flex justify-center items-center p-2'>
            <Button
                onClick={handlePreviousPage}
                className='text-white focus:outline-none'
            >
                <ChevronLeft className='w-6 h-6' />
            </Button>
            <span className='text-white mx-2'>{currentPage}</span>
            <Button
                onClick={handleNextPage}
                className='text-white focus:outline-none'
            >
                <ChevronRight className='w-6 h-6' />
            </Button>
        </div>
    );
};

export default PaginationControl;
