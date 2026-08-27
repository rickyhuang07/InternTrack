"use client";

import { useState } from "react";

export default function AddApplication() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [dateApplied, setDateApplied] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitApplication() {
    if (!company.trim() || !position.trim()) {
      alert("Please enter a company and position.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          position,
          location,
          status,
          dateApplied: dateApplied || null,
          deadline: deadline || null,
          link,
          notes,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to add application:", error);
        alert("Failed to add application.");
        return;
      }

      await response.json();

      setCompany("");
      setPosition("");
      setLocation("");
      setStatus("APPLIED");
      setDateApplied("");
      setDeadline("");
      setLink("");
      setNotes("");

      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">

      {/* Company */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Company
        </label>

        <input
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
          placeholder="e.g. Google"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>


      {/* Position */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Position
        </label>

        <input
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
          placeholder="e.g. Software Engineer Intern"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>


      {/* Location */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Location
        </label>

        <input
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
          placeholder="e.g. Houston, TX"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>


      {/* Status */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Status
        </label>

        <select
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="APPLIED">Applied</option>
          <option value="OA">Online Assessment</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>


      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Date Applied
          </label>

          <input
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Deadline
          </label>

          <input
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

      </div>


      {/* Job Link */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Job Link
        </label>

        <input
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
          placeholder="https://..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>


      {/* Notes */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Notes
        </label>

        <textarea
          className="min-h-[90px] w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
          placeholder="Add notes about this application..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>


      {/* Submit */}
      <button
        className="w-full rounded-lg bg-[#635bff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#554ee6] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={submitApplication}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding Application..." : "Add Application"}
      </button>

    </div>
  );
}