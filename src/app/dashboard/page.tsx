import { prisma } from "@/lib/prisma";
import AddApplication from "@/components/AddApplication";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Dashboard() {
  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const stats = {
    APPLIED: 0,
    OA: 0,
    INTERVIEW: 0,
    OFFER: 0,
    REJECTED: 0,
  };

  for (const app of applications) {
    if (app.status in stats) {
      stats[app.status as keyof typeof stats]++;
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-[#171717]">

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

        <nav className="space-y-2">

          <div className="flex items-center gap-3 rounded-lg bg-[#f0efff] px-3 py-2.5 text-sm font-medium text-[#635bff]">
            <span>▦</span>
            Dashboard
          </div>

          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500">
            <span>▤</span>
            Applications
          </div>

        </nav>

        <div className="mt-auto rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-medium text-gray-500">
            Applications
          </p>

          <p className="mt-1 text-2xl font-bold">
            {applications.length}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            tracked so far
          </p>

        </div>

      </aside>


      {/* Main */}
      <div className="md:ml-64">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="mb-1 text-sm font-medium text-[#635bff]">
                Overview
              </p>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Application Dashboard
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Keep track of your internship search in one place.
              </p>

            </div>

            <div className="w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
              {applications.length} applications
            </div>

          </div>


          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">

            <Card
              title="Applied"
              count={stats.APPLIED}
              description="Applications submitted"
              icon="↗"
            />

            <Card
              title="Online Assessments"
              count={stats.OA}
              description="Assessments received"
              icon="◈"
            />

            <Card
              title="Interviews"
              count={stats.INTERVIEW}
              description="Interview stages"
              icon="◎"
            />

            <Card
              title="Offers"
              count={stats.OFFER}
              description="Offers received"
              icon="★"
            />

          </div>


          {/* Main Content */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">


            {/* Applications */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-5 sm:px-6">

                <div>
                  <h3 className="font-semibold">
                    Recent Applications
                  </h3>

                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    Your latest internship applications
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                  {applications.length}
                </span>

              </div>


              {/* Empty State */}
              {applications.length === 0 ? (

                <div className="px-6 py-16 text-center sm:py-20">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0efff] text-2xl text-[#635bff]">
                    +
                  </div>

                  <h4 className="mt-4 text-sm font-semibold">
                    No applications yet
                  </h4>

                  <p className="mx-auto mt-2 max-w-xs text-sm text-gray-400">
                    Start tracking your internship search by adding your first application.
                  </p>

                  <p className="mt-4 text-xs font-medium text-[#635bff]">
                    Add an application →
                  </p>

                </div>

              ) : (

                <>

                  {/* Desktop Table */}
                  <div className="hidden md:block">

                    <div className="grid grid-cols-[1.2fr_1.4fr_1fr_120px_110px] border-b border-gray-100 bg-gray-50/50 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">

                      <span>Company</span>
                      <span>Position</span>
                      <span>Location</span>
                      <span>Status</span>
                      <span>Date</span>

                    </div>


                    {applications.slice(0, 8).map((app) => (

                      <div
                        key={app.id}
                        className="grid grid-cols-[1.2fr_1.4fr_1fr_120px_110px] items-center border-b border-gray-100 px-6 py-4 last:border-0 transition hover:bg-gray-50"
                      >

                        {/* Company */}
                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
                            {app.company.charAt(0).toUpperCase()}
                          </div>

                          <p className="truncate text-sm font-semibold">
                            {app.company}
                          </p>

                        </div>


                        {/* Position */}
                        <p className="truncate pr-4 text-sm text-gray-600">
                          {app.position}
                        </p>


                        {/* Location */}
                        <p className="truncate pr-4 text-sm text-gray-400">
                          {app.location || "—"}
                        </p>


                        {/* Status */}
                        <StatusBadge status={app.status} />


                        {/* Date */}
                        <p className="text-xs text-gray-400">
                          {app.dateApplied
                            ? new Date(app.dateApplied).toLocaleDateString()
                            : "—"}
                        </p>

                      </div>

                    ))}

                  </div>


                  {/* Mobile Cards */}
                  <div className="divide-y divide-gray-100 md:hidden">

                    {applications.slice(0, 8).map((app) => (

                      <div
                        key={app.id}
                        className="p-4 transition hover:bg-gray-50"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
                              {app.company.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold">
                                {app.company}
                              </p>

                              <p className="truncate text-xs text-gray-400">
                                {app.position}
                              </p>

                            </div>

                          </div>

                          <StatusBadge status={app.status} />

                        </div>


                        <div className="mt-3 flex gap-4 pl-13 text-xs text-gray-400">

                          <span>
                            📍 {app.location || "No location"}
                          </span>

                          <span>
                            {app.dateApplied
                              ? new Date(app.dateApplied).toLocaleDateString()
                              : "No date"}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>

                </>

              )}

            </section>


            {/* Add Application */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">

                <h3 className="font-semibold">
                  Add Application
                </h3>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                  Track a new internship opportunity.
                </p>

              </div>

              <div className="p-5 sm:p-6">
                <AddApplication />
              </div>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
}


/* Stats */

function Card({
  title,
  count,
  description,
  icon,
}: {
  title: string;
  count: number;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">

      <div className="flex items-start justify-between gap-2">

        <div className="min-w-0">

          <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight sm:mt-3 sm:text-3xl">
            {count}
          </p>

        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0efff] text-sm text-[#635bff] sm:h-9 sm:w-9">
          {icon}
        </div>

      </div>

      <p className="mt-2 text-[10px] text-gray-400 sm:mt-3 sm:text-xs">
        {description}
      </p>

    </div>
  );
}


/* Status Badge */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    APPLIED: "bg-blue-50 text-blue-600",
    OA: "bg-purple-50 text-purple-600",
    INTERVIEW: "bg-amber-50 text-amber-600",
    OFFER: "bg-green-50 text-green-600",
    REJECTED: "bg-red-50 text-red-500",
  };

  const labels: Record<string, string> = {
    APPLIED: "Applied",
    OA: "Online Assessment",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    REJECTED: "Rejected",
  };

  return (
    <span
      className={`inline-flex w-fit shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium sm:text-xs ${
        styles[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}