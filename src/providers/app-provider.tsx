import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProviderWithClerk } from "./convex-client-provider-with-clerk";
import { dark } from "@clerk/themes";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <ConvexClientProviderWithClerk>{children}</ConvexClientProviderWithClerk>
    </ClerkProvider>
  );
};
