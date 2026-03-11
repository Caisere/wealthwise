"use client";

import Link from "next/link";
import { useState } from "react";
import { Field } from "@/app/components/form/field";
import { T } from "@/app/lib/theme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CredentialsSchema, type LoginSchema } from "@/app/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    setError,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(CredentialsSchema),
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      const { email, password } = data;
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("root", {
          type: "server",
          message:
            result.error === "CredentialsSignin"
              ? "Invalid email or password"
              : "Failed to login. Please try again.",
        });
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      router.push("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      {errors.root?.message && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}
      <Field
        label="Email address"
        type="email"
        placeholder="you@example.com"
        {...register("email")}
        icon="✉"
      />
      {errors?.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      <Field
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        {...register("password")}
        icon="🔒"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      {errors?.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <div className="text-right mb-6">
        <Link href="/forgot-password" style={{ fontSize: 13, color: T.G }}>
          Forgot password?
        </Link>
      </div>
      <button
        style={{
          width: "100%",
          padding: "12px",
          background: `linear-gradient(135deg,${T.GM},${T.GD})`,
          border: "none",
          borderRadius: 12,
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          boxShadow: `0 4px 20px ${T.G}30`,
        }}
      >
        {isSubmitting ? "Signing in..." : "Sign in →"}
      </button>
    </form>
  );
}
