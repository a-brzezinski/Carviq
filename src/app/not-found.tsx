import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
        <Image src="/notfound.svg" alt="Not Found" fill className="object-contain" priority />
      </div>
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Page not found</h1>
      <p className="mt-2 text-base sm:text-lg">The page you&apos;re looking for doesn&apos;t exist.</p>
      <p className="mt-4 text-sm text-gray-500">You can go back to the homepage or check your URL.</p>
      <Link href="/" className="mt-4 text-gray-500 underline">
        Back home
      </Link>
    </div>
  );
}
