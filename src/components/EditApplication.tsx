"use client";

import { useState } from "react";

export default function EditApplication({
  application,
}: {
  application: {
    id: string;
    company: string;
    position: string;
    location: string | null;
    status: string;
    dateApplied: Date | null;
    deadline: Date | null;
    link: string | null;
    notes: string | null;
  };
}) {
  const [company, setCompany] = useState(application.company);
  const [position, setPosition] = useState(application.position);
  const [location, setLocation] = useState(application.location || "");
  const [status, setStatus] = useState(application.status);
  const [dateApplied, setDateApplied] = useState(
  application.dateApplied
    ? new Date(application.dateApplied).toISOString().split("T")[0]
    : ""
);

const [deadline, setDeadline] = useState(
  application.deadline
    ? new Date(application.deadline).toISOString().split("T")[0]
    : ""
);

const [link, setLink] = useState(application.link || "");
const [notes, setNotes] = useState(application.notes || "");

  return (
    <form className="mt-6 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium">Company</label>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Position</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2"
        >
          <option value="APPLIED">Applied</option>
          <option value="OA">OA</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
            <div>
        <label className="text-sm font-medium">Date Applied</label>
        <input
          type="date"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Job Link</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>
            <button
        type="submit"
        className="rounded-lg bg-[#635bff] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5148d8]"
      >
        Save Changes
      </button>
    </form>
  );
}