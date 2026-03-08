import Sidebar from "../components/layout/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060a12" }}>
      {/* Ambient glows */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "25%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(74,222,128,0.05),transparent)",
          pointerEvents: "none",
          zIndex: 0,
          transform: "translate(-50%,-50%)",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          right: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(56,189,248,0.04),transparent)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Sidebar />
      <main
        style={{
          flex: 1,
          overflow: "auto",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          color: "#f1f5f9",
        }}
      >
        {children}
      </main>
    </div>
  );
}
