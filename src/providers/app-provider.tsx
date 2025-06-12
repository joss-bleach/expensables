import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProviderWithClerk } from "./convex-client-provider-with-clerk";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ConvexClientProviderWithClerk>{children}</ConvexClientProviderWithClerk>
    </ClerkProvider>
  );
};
