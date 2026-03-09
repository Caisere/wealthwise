import { T } from "@/app/lib/theme";
import { useRouter } from "next/navigation";

export function SignInWithGoogleBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.bdA)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.bdr)}
      className="w-full p-3 border rounded-lg text-sm mb-6 flex items-center justify-center gap-2 font-medium"
      style={{
        background: T.inp,
        color: T.tx,
        fontSize: 14,
      }}
    >
      <span className="text-lg font-extrabold">G</span> Continue with
      Google
    </button>
  );
}