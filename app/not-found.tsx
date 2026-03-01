"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mt-16 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block px-6 py-3 text-lg bg-accent-500 text-primary-800"
      >
        back to Home page
      </Link>
    </main>
  );
}
