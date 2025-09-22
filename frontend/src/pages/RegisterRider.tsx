import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { registerRider } from "@/api";


export default function RegisterRider() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        phoneNumber: "",
        licenseNumber: "",
        rating: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await registerRider({
                email: form.email,
                password: form.password,
                phoneNumber: form.phoneNumber,
                licenseNumber: form.licenseNumber || undefined,
                rating: form.rating ? Number(form.rating) : undefined,
            });
            if (res.status < 200 || res.status >= 300) throw new Error("Registration failed");
            setSuccess("Registration successful!");
            toast.success("Registration successful!");
            setForm({
                email: "",
                password: "",
                phoneNumber: "",
                licenseNumber: "",
                rating: "",
            });
        } catch (err: any) {
            setError(err.message || "Error");
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="max-w-md w-full p-8 shadow-lg rounded-xl bg-white">
                <h2 className="text-3xl font-extrabold mb-6 text-sky-500 text-center">
                    Register as Rider
                </h2>
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
                        focusBg="sky-50"
                    />
                    <FormField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        placeholder="Password"
                        focusBg="sky-50"
                    />
                    <FormField
                        label="Phone Number"
                        name="phoneNumber"
                        type="tel"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        placeholder="Phone Number"
                        focusBg="sky-50"
                    />
                    <FormField
                        label="License Number"
                        name="licenseNumber"
                        type="text"
                        value={form.licenseNumber}
                        onChange={handleChange}
                        placeholder="License Number (optional)"
                        focusBg="teal-50"
                    />
                    <FormField
                        label="Rating"
                        name="rating"
                        type="number"
                        value={form.rating}
                        onChange={handleChange}
                        placeholder="Rating (optional)"
                        focusBg="teal-50"
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sky-500 hover:bg-emerald-500 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                    {error && (
                        <div className="text-xs text-red-500 text-center mt-2">{error}</div>
                    )}
                    {success && (
                        <div className="text-xs text-green-600 text-center mt-2">
                            {success}
                        </div>
                    )}
                </form>
            </Card>
        </div>
    );
}
