import { PageResponse } from "@/types/PageResponse";
import { User } from "@/types/User";

export interface ApiServiceResult {
    data: User[];
    total: number;
}

export const fetchData = async (page: number, perPage: number): Promise<ApiServiceResult> => {
    const url = `https://reqres.in/api/users?page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(url);
        const jsonData: PageResponse = await response.json();
        return { data: jsonData.data, total: jsonData.total };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};