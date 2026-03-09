import { T } from "@/app/lib/theme";

export function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
}) {
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
