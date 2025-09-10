import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to FastSchool AI
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Your AI-powered teaching assistant.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
