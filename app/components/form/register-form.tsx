'use client'

import { PasswordHealth } from "./password-health";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Field } from "@/app/components/form/field";
import { T } from "@/app/lib/theme";
import { RegisterFormData } from "@/app/types";
import { createUser } from "@/app/lib/actions";



export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('')

    try {
      const parsedData = RegisterFormData.safeParse(form)

      if(!parsedData.success) {
        setError('Invalid user input')
        return
      }

      const {name, email, password} = parsedData.data

      const result = await createUser({name, email, password})

      if(!result.success) {
        setError(result.message)
        return;
      }

      router.push('/login')

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw error;
      } else {
        setError('An unknown error occurred');
        throw new Error(String(error));
      }
    }finally {
      setLoading(false)
    }
  };

  const strength =
    form.password.length === 0
      ? 0
      : form.password.length < 5
        ? 1
        : form.password.length < 9
          ? 3
          : 5;
  const strengthLabel = ["", "Weak", "", "Fair", "", "Strong"][strength] ?? "";
  const strengthColor = strength >= 5 ? T.G : strength >= 3 ? T.A : T.R;
  return (
    <form action="">
      {error && <p>{error}</p>}
      <Field
        label="Full name"
        placeholder="Adebayo Okafor"
        value={form.name}
        onChange={set("name")}
        icon="👤"
      />
      <Field
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={set("email")}
        icon="✉"
      />
      <Field
        label="Password"
        type={showPassword ? "text" : "password"}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        placeholder="Min. 8 characters"
        value={form.password}
        onChange={set("password")}
        icon="🔒"
      />
      {form.password.length > 0 && (
        <PasswordHealth
          strength={strength}
          strengthLabel={strengthLabel}
          strengthColor={strengthColor}
        />
      )}
      <button
        onClick={handleRegister}
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
          marginBottom: 12,
        }}
      >
        {loading ? "Creating account..." : "Create account →"}
      </button>
    </form>
  );
}
