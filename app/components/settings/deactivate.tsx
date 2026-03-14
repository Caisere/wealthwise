"use client";

import { deleteUser, DeleteUserReturnType } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signOut } from "next-auth/react";
import { useActionState, useEffect } from "react";

export function Deactivate() {
  const [state, formAction, isPending] = useActionState<
    DeleteUserReturnType | null,
    FormData
  >(deleteUser, null);

  useEffect(() => {
    if (state?.success) {
      signOut({ callbackUrl: "/login" });
    }
  }, [state]);

  return (
    <div className="rounded-[18px] border border-danger/25 p-6">
      <h3 className="mb-4 font-display text-[16px] font-bold text-danger">
        Danger Zone
      </h3>
      <p className="mb-4 text-[13px] leading-relaxed text-muted">
        Deleting your account is permanent and irreversible. All your data —
        transactions, budgets, accounts — will be gone forever.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete my account</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm bg-black border-2 border-border-accent">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot
              be undone. Please enter your password to confirm.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form
              className="w-full flex flex-col gap-4 bg-transparent"
              action={formAction}
            >
              <FieldGroup>
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    required
                    name="password"
                    id="password"
                    type="password"
                    className="rounded-sm"
                  />
                </Field>
                {state?.message && (
                  <p
                    className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}
                  >
                    {state.message}
                  </p>
                )}
              </FieldGroup>
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button variant="default">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" type="submit">
                  {isPending ? "Deleting" : "Delete"}
                </Button>
              </div>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
