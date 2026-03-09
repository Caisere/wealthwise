import { T } from "@/app/lib/theme";

type PasswordHealthProps = {
  strength: number;
  strengthColor: string,
  strengthLabel: string
}


export function PasswordHealth ({strength, strengthColor, strengthLabel}: PasswordHealthProps) {
  return (
    <div className="-mt-2 mb-5">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 4,
              background:
                i <= strength ? strengthColor : "rgba(255,255,255,0.08)",
              transition: "background .3s",
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 11, color: T.di }}>
        Password strength:{" "}
        <span style={{ color: strengthColor }}>{strengthLabel}</span>
      </div>
    </div>
  );
}