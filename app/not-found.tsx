import Link from "next/link";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link href="/" className="ml-4 text-blue-500 hover:underline"> Go back home</Link>
    </div>
  );
}

export default NotFound;