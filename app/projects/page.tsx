// app/projects/page.tsx

export const metadata = {
  title: "Projects | My Portfolio",
  description: "A showcase of my best work and case studies.",
};

import Projects from "@/components/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] flex flex-col items-center justify-center">
      <Projects />
    </main>
  );
}
