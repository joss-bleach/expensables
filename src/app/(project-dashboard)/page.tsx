import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { ProjectDashboardView } from "@/modules/project-dashboard/ui/views/project-dashboard-view";

export const metadata: Metadata = {
  title: "Projects",
};

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <ProjectDashboardView />;
};

export default Page;
