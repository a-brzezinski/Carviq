"use client";

export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600">An error occurred</h1>
      <p className="mt-2 text-gray-500">Please try again later.</p>
    </div>
  );
}
