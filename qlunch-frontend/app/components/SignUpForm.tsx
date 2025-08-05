import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password should have at least 8 characters")
        .regex(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*])/,
            "Password must include uppercase, lowercase, number, and special character"
        ),
    confirmPassword: z.string().min(8, "Confirm password is required"),
    address: z.string().min(1, "Address is required"),
    countryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z
        .string()
        .length(10, "Phone number must be 10 digits")
        .regex(/^[3-9]\d{9}$/, "Enter a valid phone number"),
    website: z
        .string()
        .optional()
        .or(z.literal("").transform(() => undefined))
        .refine(
            (url) => !url || /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}(\/[^\s]*)?$/.test(url), "Enter a valid website URL"
        ),
    zipCode: z
        .string()
        .length(5, "Zip Code must be exactly 5 digits"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type SignUpFormInputs = z.infer<typeof signUpSchema>;

export function SignUpForm() {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<SignUpFormInputs>({
        resolver: zodResolver(signUpSchema),
    });
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
    const navigate = useNavigate();

    const handlePasswordToggle = () => {
        setPasswordToggle(!passwordToggle);
    }

    const handleConfirmPasswordToggle = () => {
        setConfirmPasswordToggle(!confirmPasswordToggle);
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setValue("phoneNumber", value);
    };

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setValue("zipCode", value);
    };

    const onSubmit = (data: SignUpFormInputs) => {
        console.log(data);
        reset();
        navigate("/sign-in");
    };

    return (
        <div className="bg-[#121d2d]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-[680px] w-full">
                    <div className="p-6 sm:p-8 bg-white border border-gray-200 shadow-sm">
                        <h1 className="text-slate-900 text-center text-3xl font-semibold">
                            Sign up
                        </h1>
                        <form className="mt-12 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Full Name</label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        placeholder="Enter full name"
                                        className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.name ? "border border-red-600" : "border border-slate-300"
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="ali@example.com"
                                        className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.email ? "border border-red-600" : "border border-slate-300"
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            {...register("password")}
                                            type={passwordToggle ? "text" : "password"}
                                            placeholder="Enter password"
                                            className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.password ? "border border-red-600" : "border border-slate-300"
                                                }`}
                                        />
                                        <svg onClick={handlePasswordToggle} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        </svg>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Confirm Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            {...register("confirmPassword")}
                                            type={confirmPasswordToggle ? "text" : "password"}
                                            placeholder="Confirm password"
                                            className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.confirmPassword ? "border border-red-600" : "border border-slate-300"
                                                }`}
                                        />
                                        <svg onClick={handleConfirmPasswordToggle} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        </svg>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Address</label>
                                    <input
                                        {...register("address")}
                                        type="text"
                                        placeholder="123 Street, XYZ City"
                                        className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.address ? "border border-red-600" : "border border-slate-300"}`}
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Phone Number</label>
                                    <div className="flex gap-2 items-center">
                                        <select
                                            {...register("countryCode")}
                                            className="text-slate-900 text-sm border border-slate-300 px-2 py-3 bg-white"
                                        >
                                            <option value="+92">🇵🇰 +92</option>
                                        </select>
                                        <input
                                            {...register("phoneNumber")}
                                            type="text"
                                            onChange={handlePhoneChange}
                                            placeholder="3000000000"
                                            className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.phoneNumber ? "border border-red-600" : "border border-slate-300"}`}
                                        />
                                    </div>
                                    {errors.phoneNumber && (
                                        <p className="text-red-600 text-sm mt-1">{errors.phoneNumber.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Website (Optional)</label>
                                    <input
                                        {...register("website")}
                                        type="text"
                                        placeholder="https://www.example.com"
                                        className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.website ? "border border-red-600" : "border border-slate-300"}`}
                                    />
                                    {errors.website && (
                                        <p className="text-red-600 text-sm mt-1">{errors.website.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-slate-900 text-sm font-medium mb-2 block">Zip Code</label>
                                    <input
                                        {...register("zipCode")}
                                        type="text"
                                        onChange={handleZipCodeChange}
                                        placeholder="12345"
                                        className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.zipCode ? "border border-red-600" : "border border-slate-300"}`}
                                    />
                                    {errors.zipCode && (
                                        <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide text-white bg-[#2173ea] hover:bg-blue-700 focus:outline-none cursor-pointer">
                                Sign up
                            </button>

                            <p className="text-slate-900 text-sm text-center">Already have an account?{" "}<Link to="/sign-in" className="text-[#2173ea] hover:underline ml-1 font-semibold">Login here</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};