'use client';

import { Button, Input } from "../ui";
import { useState } from "react";

export function UpdatePassword() {
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mb-4 rounded-[18px] border border-base p-6">
      <h3 className="mb-5 font-display text-[16px] font-bold text-text">
        Security
      </h3>
      <Input
        label="Current Password"
        type="password"
        placeholder="••••••••"
        value=""
        onChange={() => {}}
      />
      <Input
        label="New Password"
        type="password"
        placeholder="••••••••"
        value=""
        onChange={() => {}}
      />
      <Input
        label="Confirm New Password"
        type="password"
        placeholder="••••••••"
        value=""
        onChange={() => {}}
      />
      <Button variant="primary" size="sm" onClick={save}>
        Update password
      </Button>
    </div>
  );
}