"use client";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/modules/project-dashboard/hooks/use-create-project-modal";

export const NewProjectButton = () => {
  const { open } = useCreateProject();

  return (
    <>
      <Button onClick={open} className="hover:cursor-pointer">
        New project
      </Button>
    </>
  );
};
