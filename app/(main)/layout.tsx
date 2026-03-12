import Sidebar from "../components/layout/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg">
      {/* Ambient glows */}
      <div
        className="fixed top-[10%] left-[25%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,rgba(74,222,128,0.05),transparent)]"
      />
      <div
        className="fixed -bottom-[10%] right-[5%] h-[400px] w-[400px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,rgba(56,189,248,0.04),transparent)]"
      />
      <Sidebar />
      <main className="relative z-10 flex-1 min-h-screen overflow-auto text-text">
        {children}
      </main>
    </div>
  );
}
