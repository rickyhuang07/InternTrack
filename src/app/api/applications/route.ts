import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const applications = await prisma.application.findMany();

  return NextResponse.json(applications);
}

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.user.upsert({
    where: {
      email: "test@example.com",
    },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
    },
  });

  const application = await prisma.application.create({
    data: {
      company: body.company,
      position: body.position,
      location: body.location,
      status: body.status,
      dateApplied: body.dateApplied
        ? new Date(body.dateApplied)
        : null,
      deadline: body.deadline
        ? new Date(body.deadline)
        : null,
      link: body.link,
      notes: body.notes,
      userId: user.id,
    },
  });

  return NextResponse.json(application);
}