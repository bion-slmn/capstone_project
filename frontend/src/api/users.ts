import { api } from "./index";

export async function registerClient(data: {
    email: string;
    password: string;
    phoneNumber: string;
    loyaltyPoints?: number;
}) {
    return api.post("/users/register-client", data);
}

export async function registerRider(data: {
    email: string;
    password: string;
    phoneNumber: string;
    licenseNumber?: string;
    rating?: number;
}) {
    return api.post("/users/register-rider", data);
}
