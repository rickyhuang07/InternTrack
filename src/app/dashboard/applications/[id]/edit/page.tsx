import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditApplication from "@/components/EditApplication";  // allows us to actually render editapplication from page

export const dynamic = "force-dynamic";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await prisma.application.findUnique({ // finds application id
    where: {
      id,
    },
  });

  if (!application) {
  notFound();
} // handles scenario where user manually visits invalid url

  return (
    <main className="min-h-screen bg-[#f7f7f8] p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Edit Application
        </h1>

        <EditApplication application={application} />
      </div>
    </main>
  );
}