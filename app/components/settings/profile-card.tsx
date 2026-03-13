"use client";

import { Button, Input, Select } from "../ui";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { nameAbbr } from "@/app/lib/nameAbbr";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/lib/actions";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function ProfileCard() {
  const {data: session, update} = useSession();
  console.log("Session data in ProfileCard:", session);
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(session?.user?.name ?? "");
    setEmail(session?.user?.email ?? "");
  }, [session?.user?.name, session?.user?.email]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const names = session?.user?.name as string;

  const abbr = nameAbbr(names ?? "");

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();

    setIsUpdating(true);
    try {
      if (!session) {
        toast.error("User session not found. Please log in again.");
        router.push("/login");
        return;
      }

      if (!name.trim() || !email.trim()) {
        toast.error("Name and email cannot be empty.");
        return;
      }

      if (!emailRegex.test(email.trim())) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const response = await updateUser(name, email);

      if (response.success) {
        await update({refreshUser: true}); // Refresh session data
        toast.success(response.message || "Profile updated successfully.");
      } else {
        toast.error(response.message || "Update failed.");
        return; // don't close edit mode on failure
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error(
        "An error occurred while updating your profile. Please try again.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="">
      {/* Profile */}
      <div className="mb-4 rounded-[18px] border p-6">
        <h3 className="mb-5 text-[16px] font-bold text-text font-display">
          Profile
        </h3>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#1e3a2f,#4ade80)] text-2xl font-bold text-white">
            {abbr || "NA"}
          </div>
          <div>
            <p className="mb-0.5 text-[15px] font-semibold text-text">
              {session?.user?.name}
            </p>
            <p className="text-[13px] text-muted">{session?.user.email}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => {
                setEdit((edit) => !edit);

                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              className="ml-auto rounded-[10px] border border-base bg-input px-[14px] py-[7px] text-[12px] text-muted"
            >
              {edit ? "Cancel" : "Edit"}
            </button>
            <button className="ml-auto rounded-[10px] border border-base bg-input px-[14px] py-[7px] text-[12px] text-muted">
              Change photo
            </button>
          </div>
        </div>
        <form onSubmit={updateProfile}>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!edit}
            ref={inputRef}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!edit}
          />
          <Select
            label="Currency"
            value="NGN"
            onChange={() => {}}
            options={[
              { value: "NGN", label: "₦ Nigerian Naira (NGN)" },
              { value: "USD", label: "$ US Dollar (USD)" },
              { value: "GBP", label: "£ British Pound (GBP)" },
            ]}
          />
          {edit && (
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="mt-4"
              disabled={!edit || isUpdating}
            >
              {isUpdating ? "Updating Details" : "Update"}
            </Button>
          )}
        </form>
      </div>
    </section>
  );
}
