"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f8] p-6">

      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          !
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          We couldn't load your applications. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-[#635bff] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#554ee6]"
        >
          Try again
        </button>

      </div>

    </main>
  );
}