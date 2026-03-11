import { T } from "@/app/lib/theme";
import type {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  FocusEvent,
} from "react";

type FieldProps = {
  label: string;
  icon?: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "style">;

export function Field({
  label,
  icon,
  showPassword,
  setShowPassword,
  onFocus,
  onBlur,
  type = "text",
  ...inputProps
}: FieldProps) {
  return (
    <div style={{ marginBottom: 16 }}>
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
      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 15,
            }}
          >
            {icon}
          </span>
        )}
        <div className="relative">
          <input
            type={type}
            {...inputProps}
            onFocus={(e: FocusEvent<HTMLInputElement>) => {
              onFocus?.(e);
              e.currentTarget.style.borderColor = T.bdA;
            }}
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              onBlur?.(e);
              e.currentTarget.style.borderColor = T.bdr;
            }}
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
          {showPassword !== undefined && setShowPassword !== undefined && (
            <div
              className="absolute top-2.5 right-2.5 text-lg"
              onClick={() => setShowPassword?.(!showPassword)}
            >
              {showPassword ? "👀" : "🙈"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
