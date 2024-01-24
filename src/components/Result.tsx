import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Card from "./Card"
import PaginationControl from "./PaginationControl"

interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

interface ApiResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
    support: {
        url: string
        text: string
    }
}

const Result = () => {
    const router = useRouter()
    const { query } = router
    const [data, setData] = useState<User[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        const fetchData = async () => {
            const page = query['page'] ?? '1'
            const per_page = query['per_page'] ?? '5'
            const url = `https://reqres.in/api/users?page=${page}&per_page=${per_page}`

            try {
                const response = await fetch(url)
                const jsonData: ApiResponse = await response.json()
                setData(jsonData.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [query])

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1
            router.push(`/?page=${newPage}`)
            setCurrentPage(newPage)
        }
    }

    const handleNextPage = () => {
        if (currentPage < data.length) {
            const newPage = currentPage + 1
            router.push(`/?page=${newPage}`)
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="flex flex-col gap-2 bg-blue-500 m-4 p-4 rounded-md shadow-md">
            <Card data={data} />
            <PaginationControl currentPage={currentPage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
        </div>
    )
}

export default Result;
