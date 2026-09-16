import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// grabs applications from postgres to display on frontend
export async function GET() {
  const applications = await prisma.application.findMany();

  return NextResponse.json(applications);
}
// adds new application
export async function POST(request: Request) {
  const body = await request.json();
 // we need to make sure correct user is creating application
  const user = await prisma.user.upsert({
    where: {
      email: "test@example.com",
    },
    update: {},
    // if user doesn't exist create acc for them
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
// handles editing fields
export async function PUT(request: Request) { 
  const body = await request.json();

  const application = await prisma.application.update({
    where: {
      id: body.id,
    },
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
    },
  });

  return NextResponse.json(application);
}
// deletes applications
export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.application.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({ success: true });
}