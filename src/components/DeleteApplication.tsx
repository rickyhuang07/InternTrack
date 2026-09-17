"use client"; // we need this bc we have to perform upon user interaction (click)
import { useRouter } from "next/navigation";

export default function DeleteApplication({
  applicationId,
}: {
  applicationId: string;
}) {
  const router = useRouter(); // gives client component access to next.js nav
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
    <button
      type="button"
      onClick={handleDelete} // dont call delete until click detected
      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
    >
      Delete Application
    </button>
  );
}