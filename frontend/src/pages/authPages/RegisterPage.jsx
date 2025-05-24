import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Code, Eye, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "../../schemas/registerFormSchema";
import { Link } from "react-router-dom";

const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState(false);

	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (values) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	};

	return (
		<div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-popover border rounded-lg shadow-lg w-full max-w-[22rem] px-10 py-7'>
			<div className='flex pb-5 flex-col gap-3 justify-center items-center '>
				<div className='logo font-black text-2xl flex justify-center items-center gap-2'>
					<Code size={35} className='font-extrabold text-4xl text-primary' />
					<h1>LeetLab</h1>
				</div>
                <div className="">
                    <h1 className=" font-bold text-[1.7rem]">Register Now</h1>
                    <p className="text-muted-foreground text-base">Create a free account</p>
                </div>

			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input className=" rounded-lg h-11" placeholder='Riday Mondal' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
                                     className=" rounded-lg h-11"
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
									<Input
                                     className=" rounded-lg h-11"
										type='password'
										placeholder='Pass@word111'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
                 
					<Button className=" w-full  cursor-pointer" type='submit'>Register</Button>
				</form>
			</Form>

            <div className="mt-2 flex justify-center">
                <div className="text-muted-foreground">Already have an account? <Link to="/login" className="text-primary">Login</Link></div>
            </div>
		</div>
	);
};

export default RegisterPage;
