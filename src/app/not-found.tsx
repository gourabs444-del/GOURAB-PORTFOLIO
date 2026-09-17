import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050507] text-white p-6 text-center">
      <h2 className="text-4xl font-bold mb-4 font-bodoni">404 - Page Not Found</h2>
      <p className="text-neutral-400 mb-8 font-sans">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-white text-black font-sans font-bold text-sm tracking-tight hover:bg-neutral-200 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

