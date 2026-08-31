"use client";

import { useState } from "react";

type Application = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  status: string;
  dateApplied: Date | null;
};

export default function ApplicationFilters({
  applications,
}: {
  applications: Application[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL" || app.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Filters */}
      <div className="border-b border-gray-100 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <input
            type="text"
            placeholder="Search company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 sm:flex-1"
          />

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#635bff]"
          >
            <option value="ALL">All statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="OA">Online Assessment</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>

        </div>

        <p className="mt-3 text-xs text-gray-400">
          Showing {filteredApplications.length} of {applications.length} applications
        </p>
      </div>


      {/* Results */}
      {filteredApplications.length === 0 ? (

        <div className="px-6 py-16 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
            🔍
          </div>

          <h3 className="mt-4 font-semibold">
            No applications found
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Try changing your search or status filter.
          </p>

        </div>

      ) : (

        <div className="divide-y divide-gray-100">

          {filteredApplications.map((app) => (

            <div
              key={app.id}
              className="flex flex-col gap-4 px-6 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
            >

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
    </div>
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