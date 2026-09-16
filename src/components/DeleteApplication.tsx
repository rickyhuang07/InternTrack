"use client"; // we need this bc we have to perform upon user interaction (click)

export default function DeleteApplication({
  applicationId,
}: {
  applicationId: string;
}) {
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
  }

  return (
    <button
      type="button"
      onClick={handleDelete} // dont call delete until click detected
      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
    >
      Delete Application
    </button>
  );
}