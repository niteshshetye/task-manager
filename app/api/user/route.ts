import { authConfig } from "@/app/config/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authConfig);

  return NextResponse.json(session);
}
