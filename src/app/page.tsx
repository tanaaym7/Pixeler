import { auth } from "@/auth";
import { protectedRoute } from "@/features/auth/utils";

export default async function Home() {
  await protectedRoute();
  return (
    <div>
      you are logged in
    </div>
  );
}

