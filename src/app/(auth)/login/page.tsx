'use client';

import React, { useState } from 'react';
import { Home, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutateAuthData } from '@/app/hooks/useMutateData';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/app/components/ui/select";
import { useToast } from '@/app/components/ui/toast/Toast';
import SmallLoader from '@/app/components/ui/loader';
import { useRouter } from "next/navigation";



const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  type: yup.string().required("Type is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useMutateAuthData("user");
  const { toast } = useToast();
  const router = useRouter()

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);

    mutate(
      { endpoint: "account/login", payload: data },
      {
        onSuccess: (res) => {
          toast({ title: "Success", message: res.value.message || "Logged in successfully", type: "success" })

          localStorage.setItem(
            "access_token",
            res.value.value.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(res.value.value.user)
          );

          router.push("/dashboard");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          toast({ title: "Error", message: error?.response?.data.value.message || "Failed to Login", type: "error" })
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-700 to-green-800 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl text-white">Giddaa</span>
          </div>
          <div className="text-sm mt-1 text-green-100">RESIDENCIA MODERNO SMART PROPERTIES</div>

          <div className="mt-20">
            <h1 className="text-4xl font-bold text-white mb-6">Your Trusted Path to Affordable Homeownership in Nigeria.</h1>
            <p className="text-green-100 text-lg">
              Secure, stress-free, and budget-friendly homes—just for you.
            </p>
          </div>
        </div>

        <div className="text-green-100 text-sm">
          &copy; {new Date().getFullYear()} Giddaa Estate Management. All rights reserved.
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="bg-green-700 p-1.5 rounded">
              <Home className="text-white" size={28} />
            </div>
            <span className="font-bold text-2xl text-green-700">Giddaa</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
          <p className="text-gray-600 mb-8">Please enter your credentials to access your account</p>

          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="block w-full pl-10 pr-3 py-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                    placeholder="Your email address"
                    required
                  />
                </div>
                <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>

                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DEVELOPER">Developer</SelectItem>
                        <SelectItem value="DESIGNER">Designer</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && <p className="text-red-500 text-sm mt-2">{errors.type.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="block w-full pl-10 pr-10 py-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                    placeholder="Your password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <p className="font-medium text-green-600 hover:text-green-500">
                    Forgot your password?
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={isPending}
                >
                  {isPending ? <SmallLoader/> : "Sign in"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {`Don't`} have an account?{' '}
              <span className="font-medium text-green-600 hover:text-green-500">
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}