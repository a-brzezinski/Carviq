import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-4 text-center text-5xl leading-tight font-extrabold text-gray-900 md:text-6xl">
        Find Your <span className="text-primary">Perfect Car</span>
      </h1>

      <p className="mb-10 max-w-2xl text-center text-lg text-gray-600 md:text-xl">
        Browse thousands of verified listings. Quick. Simple. Reliable.
      </p>

      <Button
        asChild
        className="px-8 py-5 text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
        <Link href="/listings">Browse Listings</Link>
      </Button>
    </div>
  );
}
