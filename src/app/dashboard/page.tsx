import { prisma } from "@/lib/prisma";
import AddApplication from "@/components/AddApplication";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Dashboard() {
  const applications = await prisma.application.findMany();

  const stats = {
    APPLIED: 0,
    OA: 0,
    INTERVIEW: 0,
    OFFER: 0,
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
            <h1 className="font-semibold">InternTrack</h1>
            <p className="text-xs text-gray-400">Career Dashboard</p>
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


      {/* Main Content */}
      <div className="md:ml-64">
        
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

          {/* Header */}
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            
            <div>
              <p className="mb-1 text-sm font-medium text-[#635bff]">
                Overview
              </p>

              <h2 className="text-3xl font-bold tracking-tight">
                Application Dashboard
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Keep track of your internship search in one place.
              </p>
            </div>

            <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
              {applications.length} applications
            </div>

          </div>


          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

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


          {/* Main Grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">

            {/* Applications */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                
                <div>
                  <h3 className="font-semibold">
                    Recent Applications
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Your latest internship applications
                  </p>
                </div>

                <button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
                  View all
                </button>

              </div>


              {applications.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
                    +
                  </div>

                  <p className="font-medium">
                    No applications yet
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Add your first internship application.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">

                  {applications
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between px-6 py-4 transition hover:bg-gray-50"
                      >

                        <div className="flex items-center gap-4">

                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold">
                            {app.company.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-semibold">
                              {app.company}
                            </p>

                            <p className="text-xs text-gray-400">
                              {app.position}
                              {app.location && ` · ${app.location}`}
                            </p>
                          </div>

                        </div>


                        <StatusBadge status={app.status} />

                      </div>
                    ))}

                </div>
              )}

            </section>


            {/* Add Application */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-5">
                <h3 className="font-semibold">
                  Add Application
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Track a new internship opportunity.
                </p>
              </div>

              <AddApplication />

            </section>

          </div>

        </div>
      </div>

    </main>
  );
}


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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight">
            {count}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0efff] text-sm text-[#635bff]">
          {icon}
        </div>

      </div>

      <p className="mt-3 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
}


function StatusBadge({ status }: { status: string }) {

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
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}