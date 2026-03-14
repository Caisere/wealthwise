"use client";

import { Button, Input } from "../ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema, UpdatePasswordType } from "@/app/types";
import { toast } from "sonner";
import { userUpdatePassword } from "@/app/lib/actions";

export function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isPending },
    getValues,
    reset
  } = useForm<UpdatePasswordType>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(UpdatePasswordSchema),
  });

  async function updatePassword(data: UpdatePasswordType) {
    try {
      const {currentPassword, newPassword, confirmNewPassword} = data

      if (newPassword !== confirmNewPassword) {
        toast.error('New password and confirmation do not match');
        return;
      }

      const response = await userUpdatePassword({currentPassword, newPassword})

      if (!response.success) {
        toast.error(response.message || "Failed to update password");
        return;
      }

      toast.success("Password updated successfully");

      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  }

  return (
    <div className="mb-4 rounded-[18px] border border-base p-6">
      <h3 className="mb-5 font-display text-[16px] font-bold text-text">
        Security
      </h3>
      <form onSubmit={handleSubmit(updatePassword)}>
        <Input
          label="Current Password"
          type="password"
          placeholder="••••••••"
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <p className="text-sm text-danger mt-1">
            {errors.currentPassword.message}
          </p>
        )}
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p className="text-sm text-danger mt-1">
            {errors.newPassword.message}
          </p>
        )}
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          {...register("confirmNewPassword", {
            validate: (value) => {
              const { newPassword } = getValues();
              return value === newPassword || "Passwords do not match";
            },
          })}
        />
        {errors.confirmNewPassword && (
          <p className="text-sm text-danger mt-1">
            {errors.confirmNewPassword.message}
          </p>
        )}
        <Button variant="primary" size="sm" type="submit" disabled={isPending}>
          {isPending ? "Updating password" : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
