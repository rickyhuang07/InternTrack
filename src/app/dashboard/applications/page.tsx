import { prisma } from "@/lib/prisma";
import ApplicationFilters from "@/components/ApplicationFilters"

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


        {/* Applications */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="font-semibold">
              Applications
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Search by company or position and filter by status.
            </p>
          </div>

          <ApplicationFilters applications={applications} />
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