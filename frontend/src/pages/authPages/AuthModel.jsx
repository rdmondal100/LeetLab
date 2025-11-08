import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthForm from "../../shared/AuthForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../schemas/loginFormSchema";
import { useLoginUserMutation } from "../../redux-toolkit/services/authService";
import { toast } from "sonner";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";

const AuthModel = ({ onClose, redirectPath }) => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [currentPage, setCurrentPage] = useState("login");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleOnClose = ()=>{
    navigate('/')
  }

  const onSubmit = async (data) => {
    try {
      const res = await loginUser({
        email: data.email.trim(),
        password: data.password.trim(),
      }).unwrap();

      if (res.success) {
        toast.success(res.data.message || "Login successful");
        form.reset();
        onClose();
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Login failed");
    }
  };

  return (
    <Dialog open onOpenChange={handleOnClose}>
      <DialogContent className=" flex py-5 flex-col justify-center items-center max-w-[450px]">
        <DialogHeader className="relative">
          <DialogTitle>
            <Badge className="bg-primary/10 px-3 py-0.5 text-primary">
              Login Required
            </Badge>
          </DialogTitle>
        </DialogHeader>
        {currentPage === "login" ? (
          <LoginPage
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            setCurrentPage={setCurrentPage}
            isDialog={true}
            redirectPath={redirectPath}
          />
        ) : (
          <RegisterPage
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            setCurrentPage={setCurrentPage}
            isDialog={true}
            redirectPath={redirectPath}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModel;
