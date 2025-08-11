import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .regex(
            /^[a-zA-Z0-9._%+-]+@qbatch\.com$/,
            "Invalid email address"
        ),
});

type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ForgotPasswordInputs>({
        resolver: zodResolver(forgotPasswordSchema),
    });
    const [message, setMessage] = useState<string | null>(null);

    const onSubmit = async (data: ForgotPasswordInputs) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password/`,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setMessage("If that email is registered, we’ve sent you a password reset link.");
            reset();
        } catch (err) {
            console.error("Forgot password error:", err);
            setMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="bg-gray-100">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-[480px] w-full">
                    <div className="p-6 sm:p-8 bg-white border border-gray-200 shadow-sm">
                        <h1 className="text-slate-900 text-center text-3xl font-semibold">Forgot Password</h1>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    className={`w-full text-slate-900 text-sm px-4 py-3 outline-[#2173ea] 
                                        ${errors.email ? 'border border-red-600' : 'border border-slate-300'}`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            {message && <p className="text-center text-sm text-green-600">{message}</p>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 text-[15px] font-medium tracking-wide text-white bg-[#2173ea] hover:bg-blue-700 focus:outline-none cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
                            </button>

                            <div className="text-sm text-center">
                                <Link to="/sign-in" className="text-[#2173ea] hover:underline font-semibold">
                                    Back to Sign In
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}