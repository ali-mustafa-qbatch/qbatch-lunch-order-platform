import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';

const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Password should have at least 8 characters")
        .regex(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*])/,
            "Password must include uppercase, lowercase, number, and special character"
        ),
    confirm_password: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

export function ResetPassword() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ResetPasswordInputs>({
        resolver: zodResolver(resetPasswordSchema),
    });
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = async (data: ResetPasswordInputs) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password/confirm/?token=${token}`,
                {
                    password: data.password,
                    token: token,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            alert("Password reset successful!");
            reset();
            navigate("/sign-in");
        } catch (err) {
            console.error("Reset password error:", err);
            alert("Reset Password Link is invalid or expired.");
        }
    };

    const handlePasswordToggle = () => {
        setPasswordToggle(!passwordToggle);
    }

    const handleConfirmPasswordToggle = () => {
        setConfirmPasswordToggle(!confirmPasswordToggle);
    }

    return (
        <div className="bg-gray-100">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-[480px] w-full">
                    <div className="p-6 sm:p-8 bg-white border border-gray-200 shadow-sm">
                        <h1 className="text-slate-900 text-center text-3xl font-semibold">Reset Password</h1>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">New Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        {...register("password")}
                                        type={passwordToggle ? "text" : "password"}
                                        placeholder="Enter new password"
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
                                <label className="text-slate-900 text-sm font-medium mb-2 block">Confirm New Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        {...register("confirm_password")}
                                        type={confirmPasswordToggle ? "text" : "password"}
                                        placeholder="Re-enter new password"
                                        className={`w-full text-slate-900 text-sm px-4 py-3 pr-8 outline-[#2173ea] ${errors.confirm_password ? "border border-red-600" : "border border-slate-300"
                                            }`}
                                    />
                                    <svg onClick={handleConfirmPasswordToggle} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                    </svg>
                                </div>
                                {errors.confirm_password && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.confirm_password.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 text-[15px] font-medium tracking-wide text-white bg-[#2173ea] hover:bg-blue-700 focus:outline-none cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? "Changing..." : "Change Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}