import { AlsoShipped } from "@/components/site/also-shipped";
import { FilterPills } from "@/components/site/filter-pills";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { IntroGate } from "@/components/site/lens-enter";
import { ProjectSection } from "@/components/site/project-section";
import { ALSO_SHIPPED, PROJECTS } from "@/data/site";
import { DESCRIPTION, HOME_TITLE, ORGANIZATIONS, pageMetadata, PERSON, PERSON_ID, SITE_URL, WEBSITE, WEBSITE_ID } from "@/lib/seo";

export const metadata = pageMetadata({ description: DESCRIPTION, path: "/" });

// The home page is Hasaam's profile: the page, the person and the companies he works in.
const GRAPH = [
  WEBSITE,
  {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#page`,
    url: SITE_URL,
    name: HOME_TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  },
  PERSON,
  ...ORGANIZATIONS,
];

export default function HomePage() {
  return (
    <IntroGate>
      <JsonLd graph={GRAPH} />
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
