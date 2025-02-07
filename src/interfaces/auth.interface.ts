export interface LoginUser{
    gmail: string;
    password: string;
}
export interface RegisterUser{
    email: string;
    password: string;
    name: string;
    age?: number;
    role: string;
    address: string;
}