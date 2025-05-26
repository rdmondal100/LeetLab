import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Code, Eye, EyeClosed, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginFormSchema } from "../../schemas/loginFormSchema";
import { useLoginUserMutation } from "../../redux-toolkit/services/authService";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);

	const [loginUser, { isLoading, isSuccess, isError, error }] =
		useLoginUserMutation();

        const navigate = useNavigate();

	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (loginFormData) => {
		try {
			const userData = {
				email: loginFormData.email.trim(),
				password: loginFormData.password.trim(),
			};
			console.log(userData);
			const response = await loginUser(userData).unwrap();

            if(response?.success){
                console.log("User Logged in:", response);
                navigate('/')
                const successMessage =
                    response.data.message || "User Loggedin Successfully";
                toast.success(successMessage);

                form.reset();
            }
		
		} catch (err) {
			console.error("Login failed:", err);

			const errorMessage =
				err?.data?.message || err?.error || "Something went wrong";

			toast.error(errorMessage);
		}
	};

	return (
		<div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-popover border rounded-lg shadow-lg w-full max-w-[22rem] px-10 py-7'>
			<div className='flex pb-5 flex-col gap-3 justify-center items-center '>
				<div className='logo font-black text-2xl flex justify-center items-center gap-2'>
					<Code size={35} className='font-extrabold text-4xl text-primary' />
					<h1>DSA Battle</h1>
				</div>
				<div className='flex flex-col justify-center items-center'>
					<h1 className=' font-bold text-[1.7rem]'>Wellcome Back</h1>
					<p className='text-muted-foreground text-base'>
						Login to your account
					</p>
				</div>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										className=' rounded-lg h-11'
										type='email'
										placeholder='example@gmail.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className=' relative'>
										<Input
											className=' rounded-lg h-11'
											type={showPassword ? "text" : "password"}
											placeholder='Pass@word111'
											{...field}
										/>
										<div
											className=' text-primary absolute right-2 top-[25%] cursor-pointer'
											onClick={() => setShowPassword((prev) => !prev)}
										>
											{showPassword ? <Eye /> : <EyeClosed />}
										</div>
									</div>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						className='w-full cursor-pointer'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? (
							<div className='flex gap-1 justify-center items-center'>
								<Loader2 className='animate-spin' size={18} />
								Logging in..
							</div>
						) : (
							"Login"
						)}
					</Button>
				</form>
			</Form>

			<div className='mt-2 flex justify-center'>
				<div className='text-muted-foreground'>
					Don't have an account?{" "}
					<Link to='/register' className='text-primary'>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
