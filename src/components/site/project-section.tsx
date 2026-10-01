import { PREVIEWS } from "@/data/previews";
import { MOBILE_ORDER, type Project, type Tile } from "@/data/site";
import { PreviewTrigger } from "./preview-trigger";
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
      <ProjectHeader project={project} first={first} />
      <DesktopProject project={project} />
      <MobileProject project={project} />
      <PreviewText project={project} />
    </section>
  );
}

/*
 * One header for both layouts, so the page has one h2 per project.
 * Mobile:  mark | name          Desktop:  mark | name         | role  Visit ↗
 *          mark | role                    mark | description  |
 *          description
 */
function ProjectHeader({ project, first }: { project: Project; first?: boolean }) {
  const mobileMeta = project.mobileMeta ?? project.meta;

  return (
    <header
      // Scroll depth; the first heading is on screen at load, so it has no marker
      data-scroll-goal={first ? undefined : `scroll:${project.id}`}
      className="mx-auto grid w-full max-w-content grid-cols-[auto_1fr] items-center gap-x-3.5 gap-y-0.5 px-4 [grid-template-areas:'mark_name''mark_meta''desc_desc'] lg:grid-cols-[auto_1fr_auto] lg:gap-x-4 lg:px-0 lg:[grid-template-areas:'mark_name_side''mark_desc_side']">
      <ProjectMark mark={project.mark} size={56} className="[grid-area:mark] lg:!size-12" />
      <h2 id={`${project.id}-title`} className="self-end text-xl font-light [grid-area:name]">
        {project.name}
      </h2>
      {mobileMeta && <p className="self-start text-md text-body [grid-area:meta] lg:hidden">{mobileMeta}</p>}
      <p className="mt-3.5 text-base text-body [grid-area:desc] lg:mt-0 lg:self-start">{project.description}</p>
      {(project.meta || project.visit) && (
        <div className="hidden shrink-0 items-center gap-5 self-end pl-4 text-md [grid-area:side] lg:flex">
          {project.meta && <span className="text-body">{project.meta}</span>}
          {project.visit && (
            <a
              href={project.visit}
              target="_blank"
              rel="noopener"
              data-goal="project_visit"
              data-goal-project={project.id}
              className="group inline-flex text-ink transition-[opacity,transform] duration-150 ease-out hover:opacity-70 active:scale-[0.96]"
              aria-label={`Visit ${project.name}`}
            >
              Visit&nbsp;<span className="arrow-out">↗</span>
            </a>
          )}
        </div>
      )}
    </header>
  );
}

function DesktopProject({ project }: { project: Project }) {
  return (
    <div className="mx-auto hidden w-full max-w-content flex-col pt-12 lg:flex">
      <div className="[container-type:inline-size]">
        <div className="grid grid-cols-4 gap-4" style={{ gridAutoRows: CELL }}>
          {project.tiles.map((tile, i) => (
            <MediaTile key={tile.slug} tile={tile} project={project.name} preload={project.id === "launch-fast" && i < 2} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MediaTile({ tile, project, preload }: { tile: Tile; project: string; preload?: boolean }) {
  const { col, row, w, h } = tile.place;
  const sizes = w === 2 ? "(min-width: 1200px) 576px, 50vw" : "(min-width: 1200px) 280px, 25vw";
  const opens = Boolean(PREVIEWS[tile.slug]);

  return (
    <figure
      className={cn("tile-edge relative overflow-hidden rounded-tile bg-fill", opens && "bento-tile")}
      style={{ gridColumn: `${col} / span ${w}`, gridRow: `${row} / span ${h}` }}
    >
      <ThemeImage
        light={`/work/home/${tile.slug}-light.webp`}
        dark={`/work/home/${tile.slug}-dark.webp`}
        alt={`${project}: ${tile.label}`}
        sizes={sizes}
        preload={preload ? "(min-width: 1024px)" : undefined}
      />
      <figcaption className="absolute left-3 top-3 shadow-tile rounded-full bg-pill px-3 py-[7px] text-sm text-ink backdrop-blur-md">
        {tile.label}
      </figcaption>
      {opens && <PreviewTrigger slug={tile.slug} label={`Open ${project}: ${tile.caption}`} />}
      {opens && (
        <span
          aria-hidden
          className="bento-badge pointer-events-none absolute bottom-2 right-2 z-[12] flex size-10 items-center justify-center rounded-full bg-tile text-ink shadow-tile dark:bg-selected"
        >
          {/* Expand: the tile opens bigger, here. ↗ is kept for links that leave the site. */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 2.5h3v3M11.5 2.5 8 6M5.5 11.5h-3v-3M2.5 11.5 6 8" />
          </svg>
        </span>
      )}
    </figure>
  );
}

function MobileProject({ project }: { project: Project }) {
  const order = MOBILE_ORDER[project.id] ?? project.tiles.map((t) => t.slug);
  const tiles = order.map((slug) => project.tiles.find((t) => t.slug === slug)!).filter(Boolean);

  return (
    <div className="flex flex-col pt-6 lg:hidden">
      {/* Swipe rail: 300x360 tiles, the next one peeks in */}
      <ul className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1">
        {tiles.map((tile, i) => (
          <li key={tile.slug} className="flex w-[300px] shrink-0 snap-start flex-col gap-3">
            <div
              className={cn(
                "tile-edge relative h-[360px] w-[300px] overflow-hidden rounded-tile bg-fill",
                PREVIEWS[tile.slug] && "bento-tile",
              )}
            >
              <ThemeImage
                light={`/work/mobile/${tile.slug}-light.webp`}
                dark={`/work/mobile/${tile.slug}-dark.webp`}
                alt={`${project.name}: ${tile.caption}`}
                sizes="300px"
                // The first project's first tile is the largest paint on a phone.
                preload={project.id === "launch-fast" && i === 0 ? "(max-width: 1023px)" : undefined}
                eager={project.id === "launch-fast" && i === 0}
              />
              {PREVIEWS[tile.slug] && (
                <PreviewTrigger slug={tile.slug} label={`Open ${project.name}: ${tile.caption}`} />
              )}
            </div>
            <p className="px-1 text-base text-ink">{tile.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * The preview windows' copy, in the page's HTML. A preview only renders after
 * a click; search crawlers don't click and AI crawlers don't run JavaScript,
 * so the same words ship here, hidden, where they can read them. It is the
 * text a visitor gets on opening the tile, nothing more.
 */
function PreviewText({ project }: { project: Project }) {
  const tiles = project.tiles.filter((t) => PREVIEWS[t.slug]);
  if (tiles.length === 0) return null;

  return (
    <div hidden>
      {tiles.map((tile) => {
        const preview = PREVIEWS[tile.slug];
        return (
          <article key={tile.slug}>
            <h3>
              {project.name}: {tile.caption}. {preview.title}
            </h3>
            {preview.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <dl>
              {preview.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        );
      })}
    </div>
  );
}
