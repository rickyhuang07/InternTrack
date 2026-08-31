import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f7f7f8] p-6 md:ml-64 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-[#635bff]">
            Applications
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            All Applications
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and track all of your internship applications.
          </p>
        </div>


        {/* Application List */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

            <div>
              <h2 className="font-semibold">
                Applications
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {applications.length} total
              </p>
            </div>

          </div>


          {applications.length === 0 ? (

            <div className="px-6 py-20 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0efff] text-2xl text-[#635bff]">
                +
              </div>

              <h3 className="mt-4 font-semibold">
                No applications yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Add an application from your dashboard.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-gray-100">

              {applications.map((app) => (

                <div
                  key={app.id}
                  className="flex flex-col gap-4 px-6 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                >

                  {/* Company */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 font-semibold text-gray-600">
                      {app.company.charAt(0).toUpperCase()}
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {app.company}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {app.position}
                      </p>

                      {app.location && (
                        <p className="mt-1 text-xs text-gray-400">
                          {app.location}
                        </p>
                      )}

                    </div>

                  </div>


                  {/* Status + Date */}
                  <div className="flex items-center gap-4">

                    <StatusBadge status={app.status} />

                    <span className="text-xs text-gray-400">
                      {app.dateApplied
                        ? new Date(app.dateApplied).toLocaleDateString()
                        : "No date"}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}


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
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}