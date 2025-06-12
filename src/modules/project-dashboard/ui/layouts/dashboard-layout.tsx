import { Navbar } from "@/components/navbar";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Navbar />{" "}
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-0 md:py-12">
        {children}
      </main>
    </div>
  );
};
