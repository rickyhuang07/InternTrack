import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ApplicationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: {
      id,
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f7f8] p-6 md:p-10">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/dashboard/applications"
          className="text-sm font-medium text-gray-500 hover:text-[#635bff]"
        >
          ← Back to Applications
        </Link>
        <div className="mt-4 flex justify-end">
            <Link
                href={`/dashboard/applications/${application.id}/edit`}
                className="rounded-lg bg-[#635bff] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5148d8]"
            >
                Edit Application
            </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0efff] text-2xl font-bold text-[#635bff]">
              {application.company.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {application.company}
              </h1>

              <p className="mt-1 text-lg text-gray-500">
                {application.position}
              </p>

              {application.location && (
                <p className="mt-2 text-sm text-gray-400">
                  📍 {application.location}
                </p>
              )}
            </div>

          </div>

        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">

          <Detail
            title="Status"
            value={application.status}
          />

          <Detail
            title="Date Applied"
            value={
              application.dateApplied
                ? new Date(application.dateApplied).toLocaleDateString()
                : "Not specified"
            }
          />

          <Detail
            title="Deadline"
            value={
              application.deadline
                ? new Date(application.deadline).toLocaleDateString()
                : "Not specified"
            }
          />

          <Detail
            title="Job Link"
            value={
              application.link ? (
                <a
                  href={application.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#635bff] hover:underline"
                >
                  View Job Posting →
                </a>
              ) : (
                "No link provided"
              )
            }
          />

        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="font-semibold">
            Notes
          </h2>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
            {application.notes || "No notes added."}
          </p>

        </div>

      </div>
    </main>
  );
}

function Detail({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <div className="mt-2 text-sm font-medium text-gray-700">
        {value}
      </div>
    </div>
  );
}