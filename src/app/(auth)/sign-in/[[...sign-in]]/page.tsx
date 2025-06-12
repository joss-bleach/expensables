import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { AuthForm } from "@/modules/auth/ui/components/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
};

const Page = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return <AuthForm />;
};

export default Page;
