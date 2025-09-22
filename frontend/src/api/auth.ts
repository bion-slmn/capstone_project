import { api } from "./index";

export async function login(email: string, password: string) {
    return api.post("/auth/login", { email, password });
}
