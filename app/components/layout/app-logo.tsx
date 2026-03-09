import { T } from "@/app/lib/theme";
import Link from "next/link";

export function AppLogo () {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `linear-gradient(135deg,${T.GM},${T.GD})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 800,
          color: "#fff",
          fontFamily: T.FD,
        }}
      >
        ₩
      </div>
      <span
        style={{
          fontFamily: T.FD,
          fontWeight: 800,
          fontSize: 18,
          color: T.tx,
        }}
      >
        WealthWise
      </span>
    </Link>
  );
}