"use client";
import { T } from "@/app/lib/theme";
import {
  ReactNode,
  forwardRef,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

/* ── Badge ── */
export function Badge({
  children,
  color = T.G,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] whitespace-nowrap"
      style={{
        background: `${color}18`,
        color,
        borderColor: `${color}30`,
      }}
    >
      {children}
    </span>
  );
}

/* ── Button ── */
type BtnVariant = "primary" | "outline" | "ghost" | "danger";
type BtnSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
};

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg";

  const sizeClasses: Record<BtnSize, string> = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-5 py-[11px] text-[14px]",
    lg: "px-7 py-[14px] text-[15px]",
  };

  const variantClasses: Record<BtnVariant, string> = {
    primary:
      "gradient-brand text-white shadow-brand border border-transparent",
    outline:
      "bg-transparent text-brand border border-brand/40 hover:border-brand/60",
    ghost:
      "bg-transparent text-muted border border-base hover:border-accent hover:text-text",
    danger:
      "bg-danger/7 text-danger border border-danger/30 hover:border-danger/60",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${
        full ? "w-full" : "w-auto"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ── Input ── */
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, type = "text", placeholder, value, onChange, icon, disabled, className = "", ...props },
    ref
  ) => {
    const hasIcon = Boolean(icon);
    return (
      <div className="mb-4">
        {label && (
          <label className="mb-1.5 block text-[13px] font-medium text-muted">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] z-10">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`input-base ${hasIcon ? "pl-10" : ""} ${
              disabled ? "cursor-not-allowed opacity-70" : "cursor-text"
            } ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

/* ── Select ── */
export function Select({
  label,
  value,
  onChange,
  options,
  className = "",
}: {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1.5 block text-[13px] font-medium text-muted">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`select-base ${className}`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-card">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── Modal ── */
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="animate-fade-in fixed inset-0 z-1000 flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="animate-fade-up relative w-[90%] max-w-[480px] max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-base p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-[18px] font-bold text-text">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-base bg-input text-muted text-[16px]"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
