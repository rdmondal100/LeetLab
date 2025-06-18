import React, { useState } from "react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AuthForm = ({
  form,
  onSubmit,
  isLoading,
  isRegister = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {isRegister && (
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder='Riday Mondal' 
                    className='h-11 rounded-lg' 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type='email' 
                  placeholder='example@gmail.com' 
                  className='h-11 rounded-lg' 
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
                <div className='relative'>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder='Pass@word111'
                    className='h-11 rounded-lg'
                    {...field}
                  />
                  <div
                    className='absolute right-3 top-3 cursor-pointer text-primary'
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type='submit' 
          className='w-full h-11 text-foreground rounded-lg' 
          disabled={isLoading}
        >
          {isLoading ? (
            <span className='flex items-center gap-2'>
              <Loader2 size={18} className='animate-spin' />
              {isRegister ? "Registering..." : "Logging in..."}
            </span>
          ) : isRegister ? (
            "Register"
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;