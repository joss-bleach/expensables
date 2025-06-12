import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <header className="border-border w-full border-b py-2">
      <div className="flex h-full flex-row items-center justify-between px-4">
        <p>T</p>
        <UserButton />
      </div>
    </header>
  );
};
