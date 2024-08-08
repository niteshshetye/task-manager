import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "./config/auth";

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/auth/signin");
  } else {
    redirect("tasks");
  }
}
