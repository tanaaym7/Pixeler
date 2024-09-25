import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const protectedRoute = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/sign-in");
  }
};
