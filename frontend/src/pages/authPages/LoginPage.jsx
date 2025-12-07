
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { loginFormSchema } from "../../schemas/loginFormSchema";
import { useLoginUserMutation } from "../../redux-toolkit/services/authService";
import { toast } from "sonner";
import { Code } from "lucide-react";
import AuthForm from "../../shared/AuthForm";

const LoginPage = ({setCurrentPage,isDialog = false,redirectPath }) => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser({
        email: data.email.trim(),
        password: data.password.trim(),
      }).unwrap();

      if (res.success) {
        toast.success(res.data.message || "Login successful");
        form.reset();
        navigate(redirectPath || "/");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Login failed");
    }
  };

  return (
    <div className={`
      w-full max-w-[22rem] 
      ${!isDialog}
    `}>
      <div className='flex pb-5 flex-col gap-3 justify-center items-center '>
        <div className='logo font-black text-2xl flex justify-center items-center gap-2'>
          <Code size={35} className='font-extrabold text-4xl text-primary' />
          <h1>DSA Battle</h1>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className=' font-bold text-[1.7rem]'>Welcome Back</h1>
          <p className='text-muted-foreground text-base'>Login to your account</p>
        </div>
      </div>
      
      <AuthForm 
        form={form} 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        isRegister={false} 
      />

      <div className='mt-2 flex justify-center'>
        <div className='text-muted-foreground'>
          Don't have an account?{" "}
         <button  onClick={()=>setCurrentPage("register")} className='text-primary hover:text-foreground cursor-pointer'>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;