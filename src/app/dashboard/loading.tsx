export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] p-6 md:ml-64 md:p-10">

      <div className="mx-auto max-w-7xl animate-pulse">

        <div className="mb-8">
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="mt-3 h-9 w-80 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-96 max-w-full rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 rounded-2xl border border-gray-200 bg-white"
            />
          ))}

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">

          <div className="h-96 rounded-2xl border border-gray-200 bg-white" />

          <div className="h-96 rounded-2xl border border-gray-200 bg-white" />

        </div>

      </div>

    </main>
  );
}