import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Dashboard() {
  const applications = await prisma.application.findMany();

  const stats = {
    APPLIED: 0,
    OA: 0,
    INTERVIEW: 0,
    OFFER: 0,
  };

  for (const app of applications) {
  if (app.status in stats) {
    stats[app.status as keyof typeof stats]++;
  }
}

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-4xl font-bold">
        InternTrack
      </h1>

      <p className="text-gray-500 mt-2">
        Internship Application Dashboard
      </p>

      <div className="grid grid-cols-4 gap-5 mt-10">

        <Card title="Applied" count={stats.APPLIED}/>
        <Card title="OA" count={stats.OA}/>
        <Card title="Interview" count={stats.INTERVIEW}/>
        <Card title="Offers" count={stats.OFFER}/>

      </div>

      <AddApplication />

    </main>
  );
}
function Card(
  {
    title,
    count
  }: {
    title: string;
    count: number;
  }
) {
  return (
    <div className="
      border
      rounded-xl
      p-5
      shadow-sm
    ">

      <p className="text-gray-500">
        {title}
      </p>

      <p className="text-3xl font-bold">
        {count}
      </p>

    </div>
  );
}