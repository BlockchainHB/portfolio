import { MOBILE_ORDER, type Project, type Tile } from "@/data/site";
import { ProjectMark } from "./project-mark";
import { ThemeImage } from "./theme-image";
import { cn } from "@/lib/utils";

// Four equal cells with a 16px gap; each row is as tall as a cell is wide.
const CELL = "calc((100cqw - 48px) / 4)";

export function ProjectSection({ project, first }: { project: Project; first?: boolean }) {
  return (
    <section
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      // Jumping here (hero tiles link to #id) lands the heading 48px from the top, padding or not
      className={cn(first ? "scroll-mt-12" : "pt-12 lg:-scroll-mt-12 lg:pt-24")}
    >
      <DesktopProject project={project} />
      <MobileProject project={project} />
    </section>
  );
}

function DesktopProject({ project }: { project: Project }) {
  return (
    <div className="mx-auto hidden w-full max-w-content flex-col gap-12 lg:flex">
      <header className="flex items-end justify-between gap-8">
        <div className="flex items-center gap-4">
          <ProjectMark mark={project.mark} size={48} />
          <div className="flex flex-col gap-0.5">
            <h2 id={`${project.id}-title`} className="text-xl font-light">
              {project.name}
            </h2>
            <p className="text-base text-body">{project.description}</p>
          </div>
        </div>
        {(project.meta || project.visit) && (
          <div className="flex shrink-0 items-center gap-5 text-md">
            {project.meta && <span className="text-body">{project.meta}</span>}
            {project.visit && (
              <a
                href={project.visit}
                className="group inline-flex text-ink transition-[opacity,transform] duration-150 ease-out hover:opacity-70 active:scale-[0.96]"
                aria-label={`Visit ${project.name}`}
              >
                Visit&nbsp;<span className="arrow-out">↗</span>
              </a>
            )}
          </div>
        )}
      </header>

      <div className="[container-type:inline-size]">
        <div className="grid grid-cols-4 gap-4" style={{ gridAutoRows: CELL }}>
          {project.tiles.map((tile, i) => (
            <MediaTile key={tile.slug} tile={tile} priority={project.id === "launch-fast" && i < 2} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MediaTile({ tile, priority }: { tile: Tile; priority?: boolean }) {
  const { col, row, w, h } = tile.place;
  const sizes = w === 2 ? "(min-width: 1200px) 576px, 50vw" : "(min-width: 1200px) 280px, 25vw";

  return (
    <figure
      className="shadow-tile relative overflow-hidden rounded-tile bg-fill"
      style={{ gridColumn: `${col} / span ${w}`, gridRow: `${row} / span ${h}` }}
    >
      <ThemeImage
        light={`/work/home/${tile.slug}-light.webp`}
        dark={`/work/home/${tile.slug}-dark.webp`}
        alt={tile.label}
        sizes={sizes}
        priority={priority}
      />
      <figcaption className="absolute left-3 top-3 rounded-full bg-pill px-3 py-[7px] text-sm text-ink backdrop-blur-md">
        {tile.label}
      </figcaption>
    </figure>
  );
}

function MobileProject({ project }: { project: Project }) {
  const order = MOBILE_ORDER[project.id] ?? project.tiles.map((t) => t.slug);
  const tiles = order.map((slug) => project.tiles.find((t) => t.slug === slug)!).filter(Boolean);
  const meta = project.mobileMeta ?? project.meta;

  return (
    <div className="flex flex-col gap-6 lg:hidden">
      <header className="flex flex-col gap-4 px-4">
        <div className="flex items-center gap-3.5">
          <ProjectMark mark={project.mark} size={56} />
          <div className="flex min-w-0 flex-col gap-0.5">
            <h2 id={`${project.id}-title-m`} className="text-xl font-light">
              {project.name}
            </h2>
            {meta && <p className="text-md text-body">{meta}</p>}
          </div>
        </div>
        <p className="text-base text-body">{project.description}</p>
      </header>

      {/* Swipe rail: 300x360 tiles, the next one peeks in */}
      <ul className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1">
        {tiles.map((tile) => (
          <li key={tile.slug} className="flex w-[300px] shrink-0 snap-start flex-col gap-3">
            <div className="shadow-tile relative h-[360px] w-[300px] overflow-hidden rounded-tile bg-fill">
              <ThemeImage
                light={`/work/mobile/${tile.slug}-light.webp`}
                dark={`/work/mobile/${tile.slug}-dark.webp`}
                alt={tile.caption}
                sizes="300px"
              />
            </div>
            <p className="px-1 text-base text-ink">{tile.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
