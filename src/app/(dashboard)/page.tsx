import { protectServer } from "@/features/auth/utils";

import { Banner } from "@/app/(dashboard)/banner";
import { ProjectsSection } from "@/app/(dashboard)/projects-section";
import { TemplatesSection } from "@/app/(dashboard)/templates-section";

export default async function Home() {
  await protectServer();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
