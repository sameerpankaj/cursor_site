"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-3xl border border-black/10 bg-white/75 p-8 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted-2)]">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          The page could not load cleanly.
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          Please try again. If this keeps happening, the error reference is{" "}
          <span className="font-mono text-[var(--foreground)]">
            {error.digest ?? "not available"}
          </span>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
