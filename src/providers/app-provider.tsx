import { ConvexClientProviderWithClerk } from "./convex-client-provider-with-clerk";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ModalProvider } from "./modal-provider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <NuqsAdapter>
        <ConvexClientProviderWithClerk>
          {children}
          <ModalProvider />
        </ConvexClientProviderWithClerk>
      </NuqsAdapter>
    </ClerkProvider>
  );
};
