
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import FormField from "@/components/FormField";
import { registerClient } from "@/api";

export default function RegisterClient() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        phoneNumber: "",
        loyaltyPoints: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    function validate() {
        const newErrors: { [key: string]: string } = {};
        if (!form.email) newErrors.email = "Email is required.";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Invalid email address.";
        if (!form.password) newErrors.password = "Password is required.";
        if (!form.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
        return newErrors;
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the errors in the form.");
            return;
        }
        setLoading(true);
        try {
            const res = await registerClient({
                email: form.email,
                password: form.password,
                phoneNumber: form.phoneNumber,
                loyaltyPoints: form.loyaltyPoints ? Number(form.loyaltyPoints) : undefined
            });
            if (res.status < 200 || res.status >= 300) throw new Error("Registration failed");
            toast.success("Registration successful!");
            setForm({ email: "", password: "", phoneNumber: "", loyaltyPoints: "" });
        } catch (err: any) {
            toast.error(err.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Duplicate handleSubmit removed to fix redeclaration error.

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="max-w-md w-full p-8 shadow-lg rounded-xl bg-white">
                <h2 className="text-3xl font-extrabold mb-6 text-emerald-500 text-center">Register as Client</h2>
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
                        focusBg="emerald-50"
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
                        error={errors.password}
                        focusBg="emerald-50"
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
                        error={errors.phoneNumber}
                        focusBg="emerald-50"
                    />
                    <FormField
                        label="Loyalty Points (optional)"
                        name="loyaltyPoints"
                        type="number"
                        value={form.loyaltyPoints}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Loyalty Points (optional)"
                        error={errors.loyaltyPoints}
                        focusBg="sky-50"
                    />
                    <Button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-sky-500 text-white font-semibold py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        {loading && <Loader2 className="animate-spin w-4 h-4" />} Register
                    </Button>
                </form>
            </Card>
        </div>
    );
}
