// Central API client setup (e.g., axios)
import axios from 'axios';


export const api = axios.create({
    baseURL: 'http://localhost:3000', // Update as needed
    withCredentials: true,
});

export * from "./auth";
export * from "./users";

