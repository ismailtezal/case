export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserResponse {
    id: number;
    name: string;
    job: string;
    createdAt: string;
  }
