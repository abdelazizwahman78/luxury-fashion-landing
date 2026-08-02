import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-4 text-stone-50">
      <div className="text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-stone-400">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">The page is not here.</h1>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-stone-50 px-5 py-3 text-sm font-medium text-stone-900">
          Return home
        </Link>
      </div>
    </main>
  );
}
