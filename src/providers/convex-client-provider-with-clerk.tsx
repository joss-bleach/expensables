"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

import { env } from "@/config/env";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export const ConvexClientProviderWithClerk = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
};
