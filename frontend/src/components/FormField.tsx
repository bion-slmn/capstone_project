import { Input } from "@/components/ui/input";

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    autoComplete?: string;
    placeholder?: string;
    error?: string;
    focusBg?: string;
}

export default function FormField({
    label,
    name,
    type,
    value,
    onChange,
    required,
    autoComplete,
    placeholder,
    error,
    focusBg,
}: FormFieldProps) {
    return (
        <div className="space-y-1">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={`border-0 border-b-2 border-gray-200 focus:border-gray-200 rounded-none bg-transparent px-0 transition-colors duration-200 ${focusBg ? `focus:bg-${focusBg}` : ''} focus:outline-none`}
            />
            {error && (
                <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span>⚠️</span>
                    {error}
                </div>
            )}
        </div>
    );
}
