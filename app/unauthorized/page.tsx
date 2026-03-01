import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-16 text-xl">
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <Link href="/" className="text-blue-600 underline">
        Return to Homepage
      </Link>
    </div>
  );
}
