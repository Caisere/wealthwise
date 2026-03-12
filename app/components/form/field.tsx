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
    <div className="mb-4">
      <label className="mb-1.5 block text-[13px] font-medium text-muted">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px]"
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
            }}
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              onBlur?.(e);
            }}
            className={`input-base ${icon ? "pl-10" : ""}`}
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
