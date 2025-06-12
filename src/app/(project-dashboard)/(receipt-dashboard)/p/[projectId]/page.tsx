import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Projects",
};

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <div>Project</div>;
};

export default Page;
