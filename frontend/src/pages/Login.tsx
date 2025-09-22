
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import { Loader2 } from "lucide-react";
import FormField from "@/components/FormField";
import { login } from "@/api";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    function validate() {
        const newErrors: { [key: string]: string } = {};
        if (!form.email) newErrors.email = "Email is required.";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Invalid email address.";
        if (!form.password) newErrors.password = "Password is required.";
        return newErrors;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("🚨 Please fix the errors in the form!");
            return;
        }
        setLoading(true);
        try {
            await toast.promise(
                login(form.email, form.password),
                {
                    loading: "🔐 Logging you in...",
                    success: "✅ Welcome back! You are logged in 😊",
                    error: (err) => `❌ ${err.message || "Login failed. Please try again!"}`,
                },
                {
                    style: {
                        minWidth: '250px',
                        fontSize: '1rem',
                    },
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="max-w-md w-full p-8 shadow-lg rounded-xl bg-white">
                <h2 className="text-3xl font-extrabold mb-6 text-sky-500 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="Email"
                        error={errors.email}
                        focusBg="sky-50"
                    />
                    <FormField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                        placeholder="Password"
                        error={errors.password}
                        focusBg="sky-50"
                    />
                    <Button type="submit" disabled={loading} className="w-full bg-sky-500 hover:bg-emerald-500 text-white font-semibold py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        {loading && <Loader2 className="animate-spin w-4 h-4" />} Login
                    </Button>
                </form>
            </Card>
        </div>
    );
}
