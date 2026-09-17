"use client"; // we need this bc we have to perform upon user interaction (click)
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteApplication({
  applicationId,
}: {
  applicationId: string;
}) {
  const router = useRouter(); // gives client component access to next.js nav
  const [showConfirmation, setShowConfirmation] = useState(false);
  async function handleDelete() {
    await fetch("/api/applications", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // tells server we are sending json over
      },
      body: JSON.stringify({
        id: applicationId,
      }),
    });
    router.push("/dashboard/applications"); // redirect
  }

  return (
    <>
    <button
      type="button"
      onClick={() => setShowConfirmation(true)} // delete confirmation popup
      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
    >
      Delete Application
    </button>

      {showConfirmation && ( // only render stuff inside when sc true
      <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700">
          Are you sure you want to delete this application?
        </p>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => setShowConfirmation(false)}
            className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </>
  );
}