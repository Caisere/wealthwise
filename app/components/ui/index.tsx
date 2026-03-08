"use client";
import { T } from "@/app/lib/theme";
import { ReactNode, CSSProperties } from "react";


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
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 20,
        letterSpacing: "0.8px",
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/* ── Button ── */
type BtnVariant = "primary" | "outline" | "ghost" | "danger";
type BtnSize = "sm" | "md" | "lg";

const BTN_SIZE: Record<BtnSize, CSSProperties> = {
  sm: { padding: "7px 16px", fontSize: 13 },
  md: { padding: "11px 22px", fontSize: 14 },
  lg: { padding: "14px 30px", fontSize: 15 },
};

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  style: sx = {},
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  const variants: Record<BtnVariant, CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg,${T.GM},${T.GD})`,
      color: "#fff",
      border: "none",
      boxShadow: `0 4px 20px ${T.G}30`,
    },
    outline: {
      background: "transparent",
      color: T.G,
      border: `1px solid ${T.G}40`,
    },
    ghost: {
      background: "transparent",
      color: T.mu,
      border: `1px solid ${T.bdr}`,
    },
    danger: {
      background: `${T.R}12`,
      color: T.R,
      border: `1px solid ${T.R}30`,
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...BTN_SIZE[size],
        ...variants[variant],
        borderRadius: 12,
        fontWeight: 600,
        transition: "all .2s",
        width: full ? "100%" : "auto",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...sx,
      }}
    >
      {children}
    </button>
  );
}

/* ── Input ── */
export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            fontSize: 13,
            color: T.mu,
            display: "block",
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 15,
              zIndex: 1,
            }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={(e) => (e.currentTarget.style.borderColor = T.bdA)}
          onBlur={(e) => (e.currentTarget.style.borderColor = T.bdr)}
          style={{
            width: "100%",
            padding: icon ? "12px 14px 12px 42px" : "12px 14px",
            background: T.inp,
            border: `1px solid ${T.bdr}`,
            borderRadius: 12,
            color: T.tx,
            fontSize: 14,
            transition: "border-color .2s",
          }}
        />
      </div>
    </div>
  );
}

/* ── Select ── */
export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            fontSize: 13,
            color: T.mu,
            display: "block",
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "12px 14px",
          background: T.inp,
          border: `1px solid ${T.bdr}`,
          borderRadius: 12,
          color: T.tx,
          fontSize: 14,
          appearance: "none",
        }}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{ background: "#0a111e" }}
          >
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
      className="anim-fadein"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="anim-fadeup"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0a111e",
          border: `1px solid ${T.bdr}`,
          borderRadius: 20,
          padding: 28,
          width: "90%",
          maxWidth: 480,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontFamily: T.FD,
              fontSize: 18,
              fontWeight: 700,
              color: T.tx,
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: T.inp,
              border: `1px solid ${T.bdr}`,
              color: T.mu,
              width: 32,
              height: 32,
              borderRadius: 8,
              fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
