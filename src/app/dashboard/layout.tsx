import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#171717]">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white p-6 md:flex">

        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#635bff] text-sm font-bold text-white">
            IT
          </div>

          <div>
            <h1 className="font-semibold">
              InternTrack
            </h1>

            <p className="text-xs text-gray-400">
              Career Dashboard
            </p>
          </div>
        </div>


        {/* Navigation */}
        <nav className="space-y-2">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link
            href="/dashboard/applications"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
          >
            <span>▤</span>
            Applications
          </Link>

        </nav>


        {/* Application Count */}
        <div className="mt-auto rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500">
            Applications
          </p>

          <p className="mt-1 text-2xl font-bold">
            —
          </p>

          <p className="mt-1 text-xs text-gray-400">
            tracked so far
          </p>
        </div>

      </aside>


      {/* Page Content */}
      <div className="md:ml-64">
        {children}
      </div>

    </div>
  );
}