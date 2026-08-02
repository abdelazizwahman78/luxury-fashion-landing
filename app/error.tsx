"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-4 text-stone-50">
      <div className="text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-stone-400">Error</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Something went wrong.</h1>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-stone-50 px-5 py-3 text-sm font-medium text-stone-900"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
