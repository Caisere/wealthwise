"use client";

import { useState } from "react";
import { Field } from "@/app/components/form/field";
import { T } from "@/app/lib/theme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordFormSchema,
  ResetPasswordType,
  ResponseType,
} from "@/app/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResetPasswordFormProps = {
  token: string;
  email: string;
};

export function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    setError,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm<ResetPasswordType>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const handleResetPassword = async (data: ResetPasswordType) => {
    try {
      const { newPassword, confirmNewPassword } = data;

      const parsedPassword = ResetPasswordFormSchema.safeParse({
        newPassword,
        confirmNewPassword,
      });

      if (!parsedPassword.success) {
        toast.error("Invalid password input");
        return;
      }
      const { newPassword: password } = parsedPassword.data;

      const request = await fetch("/api/account/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password, token, email }),
      });

      const response: ResponseType = await request.json();

      if (!response.success) {
        toast.error(
          typeof response.message === "object"
            ? Object.values(response.message).flat().join(", ")
            : response.message,
        );
        return;
      }

      toast.success("password reset successfully");

      router.push("/login");
    } catch {
      toast.error("Failed to reset password. Please try again.");
      setError("root", {
        type: "server",
        message: "Failed to reset password. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <Field
        label="New Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        {...register("newPassword")}
        icon="🔒"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      {errors?.newPassword && (
        <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
      )}

      <Field
        label="Confirm New Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="••••••••"
        {...register("confirmNewPassword", {
          validate: (value) => {
            const { newPassword } = getValues();

            return value === newPassword || "Passwords do not match";
          },
        })}
        icon="🔒"
        showPassword={showConfirmPassword}
        setShowPassword={setShowConfirmPassword}
      />
      {errors?.confirmNewPassword && (
        <p className="text-red-500 text-sm">
          {errors.confirmNewPassword.message}
        </p>
      )}

      {errors.root?.message && (
        <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
      )}
      <div className="mt-4">
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
          {isSubmitting ? "Reseting Password..." : "Reset Password →"}
        </button>
      </div>
    </form>
  );
}
