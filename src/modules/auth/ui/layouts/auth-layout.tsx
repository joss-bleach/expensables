export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-dvh w-screen items-center justify-center">
      <div className="w-[380px] px-6 md:px-0">{children}</div>
    </main>
  );
};
