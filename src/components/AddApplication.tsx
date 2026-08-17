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

  async function submitApplication() {
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
    alert("Failed to add application. Check the terminal.");
    return;
  }

  const application = await response.json();

  console.log("Created application:", application);
  alert("Application added!");

  window.location.reload();
}

  return (
    <div className="border rounded-xl p-5 mt-10">

      <h2 className="text-xl font-bold mb-4">
        Add Application
      </h2>

      <input
        className="border p-2 mr-2"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select
        className="border p-2 mr-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="APPLIED">Applied</option>
        <option value="OA">OA</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>
      <input
        className="border p-2 mr-2"
        type="date"
        value={dateApplied}
        onChange={(e) => setDateApplied(e.target.value)}
      />

        <input
        className="border p-2 mr-2"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        />
        <input
        className="border p-2 mr-2"
        placeholder="Job Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        />
        <textarea
        className="border p-2 mr-2"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        />
      <button
        className="border rounded p-2"
        onClick={submitApplication}
      >
        Add Application
      </button>

    </div>
  );
}