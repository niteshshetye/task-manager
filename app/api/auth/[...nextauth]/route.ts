import { authConfig } from "@/app/config/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);

export const GET = handler;
export const POST = handler;
