import { ProjectListSection } from "../sections/project-list-section";
import { NewProjectButton } from "../components/new-project-button";

export const ProjectDashboardView = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between pb-4">
        <h1 className="text-lg font-semibold tracking-tight">Your projects</h1>
        <NewProjectButton />
      </div>
      <ProjectListSection />
    </div>
  );
};
