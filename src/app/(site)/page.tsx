import { AlsoShipped } from "@/components/site/also-shipped";
import { FilterPills } from "@/components/site/filter-pills";
import { Hero } from "@/components/site/hero";
import { IntroGate } from "@/components/site/lens-enter";
import { ProjectSection } from "@/components/site/project-section";
import { ALSO_SHIPPED, PROJECTS } from "@/data/site";

export default function HomePage() {
  return (
    <IntroGate>
      <Hero />
      {/* The work arrives last in the entrance, after the hero has said what it is */}
      <div className="intro-fade" style={{ "--delay": "300ms" } as React.CSSProperties}>
        <div className="flex justify-center px-4 pb-4 lg:hidden">
          <FilterPills id="mobile" compact />
        </div>
        {PROJECTS.map((project, i) => (
          <ProjectSection key={project.id} project={project} first={i === 0} />
        ))}
        <AlsoShipped items={ALSO_SHIPPED} variant="home" />
      </div>
    </IntroGate>
  );
}
